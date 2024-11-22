'use server'

import { z } from "zod";
import { LoginSchema } from "../../schemas";
import { signIn } from "@/auth";
import { defaultLoginRedirect } from "@/routes";
import { AuthError } from "next-auth";
import { UserService } from "@/services/user-service";
import { TokensService } from "@/services/tokens-service";
import { send2FAEmail } from "@/services/mailing-service";
import { db } from "@/lib/db";
import bcrypt from 'bcryptjs'

const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string) => {

    // Client side validation can easily be bypassed by some attacker. So we validate this on the server
    const validatedFields = LoginSchema.safeParse(values)
    
    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { email, password, twoFACode } = validatedFields.data

    // Check if the user has the email verified
    const existingUser = await UserService.getUserByEmail(email)

    if (!existingUser) {
        return { error: "Invalid Credentials" }
    }

    if (!existingUser?.emailVerified) {
        return { error: "Please verify your email to sign in" }
    }

    if (existingUser.is2FAenabled && existingUser.email) {

        // When the user is already verifying the code
        if (twoFACode) {
            const twoFactorAuthenticationCode = await TokensService.TwoFactorAuthentication.get2FATokenByEmail(existingUser.email)

            if (!twoFactorAuthenticationCode) {
                return { error: 'Something went wrong, please try again' }
            }

            if (twoFactorAuthenticationCode.token !== twoFACode) {
                return { error: 'The provided code is not valid' }
            }

            // Check if the provided token has expired
            const tokenHasExpired = new Date(twoFactorAuthenticationCode.expires) < new Date()

            if (tokenHasExpired) {
                return { error: 'The provided token has expired' }
            }

            await db.twoFactorAuthenticationToken.delete({ 
                where: { id: twoFactorAuthenticationCode.id } 
            })

            const existingConfirmation = await TokensService.TwoFactorAuthentication.get2FAConfrimation(existingUser.id)

            if (existingConfirmation) {
                await db.twoFAConfirmation.delete({ 
                    where: { id: existingConfirmation.id } 
                })
            }

            // We create the twoFA confirmation so we can continue with the flow in auth.ts 
            await db.twoFAConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })


        } else {

                // If the user exists, check if the password is correct
    if (existingUser.password) {
        const passwordsMatch = await bcrypt.compare(password, existingUser.password)
        if (!passwordsMatch) {
            return { error: 'Invalid credentials' }
        }

    }

            const twoFactorAuthenticationCode = await TokensService.TwoFactorAuthentication.generate2FAToken(existingUser.email)
            if (!twoFactorAuthenticationCode) {
                return { error: 'Something went wrong' }
            }
            await send2FAEmail(existingUser.name, existingUser.email, twoFactorAuthenticationCode.token)

            // This will be returned to the frontend to continue the login flow with 2FA
            return { twoFactorAuthentication: true, success: "Please enter the code we sent you by email" }

        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || defaultLoginRedirect
        })
        return { success: "Logging in..." }

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: 'Invalid Credentials' }
                default:
                    return { error: 'Something went wrong' }

            }
        }
        throw error
    }
}

export {
    login
}