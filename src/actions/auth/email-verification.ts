'use server'

import { sendVerificationEmail } from "@/services/mailing-service"
import { TokensService } from "@/services/tokens-service"
import { UserService } from "@/services/user-service"

const verifyEmail = async (token: string) => {

    // Check if the provided token exists
    const existingToken = await TokensService.getVerificationToken(token)

    if (!existingToken) {
        return {error: 'This link is not valid'}
    }

    // Check if the provided token has expired
    const tokenHasExpired = new Date(existingToken.expires) < new Date()

    if (tokenHasExpired) {
        return {error: 'This link has expired'}
    }

    // Check if the provided token is paired with an existing user
    const existingUser = await UserService.getUserByEmail(existingToken.email)
    
    if (!existingUser) {
        return {error: 'This verification link does not correspond to an active user'}
    }

    // Finally verify the user email
    await UserService.verifyUserEmail(existingUser.id, existingToken.email, existingToken.id)

    return {success: 'Email verified successfully! You can now login with your username and password'}
}

const resendVerificationEmail = async (email: string) => {
    const existingUser = await UserService.getUserByEmail(email)

    if (!existingUser) {
        return {error: 'This email is not registered'}
    }

    const verificationToken = await TokensService.generateVerificationToken(email)

    if (verificationToken) {     
        await sendVerificationEmail(existingUser.name, verificationToken.email, verificationToken.token)
    } else {
    return {error: "We couldn't send you an email, please try again"}
    }
    return {success: "We have sent you an email. Please check your inbox 🙂"}
}

export {
    verifyEmail,
    resendVerificationEmail
}