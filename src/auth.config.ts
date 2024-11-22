import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { UserService } from "./services/user-service"
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'

export default {
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true, 
      authorization: {
      params: {
        prompt: "select_account"
      }
    }}),
    Github({allowDangerousEmailAccountLinking: true}),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const {email, password} = validatedFields.data

          const user = await UserService.getUserByEmail(email)

          // If the user does not exist or if the user does not have a password (because the user is registered with a social provider)
          if (!user || !user.password) {
            return null
          }

          // If the user exists, check if the password is correct
          const passwordsMatch = await bcrypt.compare(password, user.password)

          // If passwords match, return the user
          if (passwordsMatch) {
            return user
          }
        }

        return null // Return null by default
      },
    })
  ],
} satisfies NextAuthConfig