import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import { UserService } from "./services/user-service"
import { db } from "./lib/db"
import { TokensService } from "./services/tokens-service"
import { AccountsService } from "./services/accounts-service"

// Neccessary for adding the custom user properties to the session.user object:
declare module "next-auth" {
  export interface Session {
    user: {
      role: string,
      is2FAenabled: boolean
      isOAuth: boolean,
      hasCredentials: boolean
    } & DefaultSession["user"]
  }
}

const prisma = new PrismaClient()

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({

  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  },

  events: {
    async linkAccount({ user, account }) {
         // Get the existing accounts for the user with the same provider
    const existingAccounts = await db.account.findMany({
      where: {
        userId: user.id,
        provider: account.provider,
        NOT: {
          providerAccountId: account.providerAccountId // Exclude the providerAccountId because its always different
        }
      }
    });
    

    // Delete the existing accounts: by default the prisma adapter linkAccount function creates a new account everytime the user signs in. To avoid having multiple (and expired) accounts for the same user, we only want to store the most up to date account.
    for (const existingAccount of existingAccounts) {
      await db.account.delete({
        where: {
          id: existingAccount.id
        }
      });
    }
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() } // We use date for verifying email because it's better than a boolean. In case our app changes some privacy settings or a user has not verified the email in a long time, we can simply know this with the date.
      })
    }
  },

  callbacks: {


    async signIn({ user, account }) {

      // Don't check email verification if user signs in with an oAuth provider.
      if (account?.provider !== 'credentials') return true

      // If the user signs in with credentials, verify email
      if (user.id) {
        const existingUser = await UserService.getUserById(user.id)

        // Prevent sign in without email verification
        if (!existingUser || !existingUser.emailVerified) {
          return false
        }

        // 2FA
        if (existingUser.is2FAenabled) {
          const twoFactorAuthConfirmation = await TokensService.TwoFactorAuthentication.get2FAConfrimation(existingUser.id)

          if (!twoFactorAuthConfirmation) {
            return false
          }

          // Delete 2FA confirmation for next sign in (2FA will be executed on every login)
          await db.twoFAConfirmation.delete({ where: { id: twoFactorAuthConfirmation.id } })
        }

      }




      return true
    },

    async jwt({ token }) {

      // If the user is logged out:
      if (!token.sub) return token

      // Check if the user exists:
      const existingUser = await UserService.getUserById(token.sub)

      // If the user does not exist:
      if (!existingUser) return token

      // If the user exists:
      const linkedAccount = await AccountsService.getAccountsByUserId(existingUser.id)

      token.isOAuth = !!linkedAccount
      token.role = existingUser.role
      token.is2FAenabled = existingUser.is2FAenabled
      token.email = existingUser.email
      token.name = existingUser.name
      token.picture = existingUser.image
      token.hasCredentials = !!existingUser.password

      // Return the token with the custom properties
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      
      // Add role to the session
      if (token.role && session.user) {
        session.user.role = token.role.toString()
      }

      // Add all user props to the session
      if (session.user) {
        session.user.is2FAenabled = token.is2FAenabled as boolean
        session.user.email = token.email as string
        session.user.name = token.name
        session.user.image = token.picture
        session.user.isOAuth = token.isOAuth as boolean
        session.user.hasCredentials = token.hasCredentials as boolean
      }


      return session

    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})