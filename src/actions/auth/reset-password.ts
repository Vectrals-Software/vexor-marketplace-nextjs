'use server'

import { sendPasswordResetEmail } from "@/services/mailing-service"
import { ForgotPasswordSchema, ResetPasswordSchema } from "@/schemas"
import { TokensService } from "@/services/tokens-service"
import { UserService } from "@/services/user-service"
import { z } from "zod"

const sendResetPasswordEmail = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    const validatedFields = ForgotPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { email } = validatedFields.data

    const existingUser = await UserService.getUserByEmail(email)

    if (!existingUser) {
        return { error: "Email not found" }
    }

    const resetPasswordToken = await TokensService.generatePasswordResetToken(email)

    if (resetPasswordToken) {
        await sendPasswordResetEmail(existingUser.name, resetPasswordToken.email, resetPasswordToken.token)
    } else {
        return { error: "We could not send an email. Please try again" }
    }

    return { success: "Reset password email sent" }
}

const createNewPassword = async (values: z.infer<typeof ResetPasswordSchema>, token?: string | null) => {
    if (!token) {
        return { error: 'Missing token!' }
    }

    const validatedFields = ResetPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { password } = validatedFields.data

    const existingToken = await TokensService.getPasswordResetToken(token)

    if (!existingToken) {
        return { error: "The provided token is not valid or does not exist" }
    }

    // Check if the provided token has expired
    const tokenHasExpired = new Date(existingToken.expires) < new Date()

    if (tokenHasExpired) {
        return { error: 'The provided token has expired' }
    }

     // Check if the provided token is paired with an existing user
     const existingUser = await UserService.getUserByEmail(existingToken.email)
    
     if (!existingUser) {
         return {error: 'The provided token does not belong to an active user'}
     }

    const result = await UserService.createNewPassword(existingUser.id, password, existingToken.id)

    return result

}

export {
    sendResetPasswordEmail,
    createNewPassword
}