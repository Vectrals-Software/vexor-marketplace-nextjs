'use server'

import { currentUser } from "@/lib/auth-user"
import { db } from "@/lib/db"
import { SettingsSchema } from "@/schemas"
import { sendVerificationEmail } from "@/services/mailing-service"
import { TokensService } from "@/services/tokens-service"
import { UserService } from "@/services/user-service"
import bcrypt from 'bcryptjs'
import { z } from "zod"

export const updateSettings = async (
    values: z.infer<typeof SettingsSchema>,
    req?: Request
) => {

    try {

        // Check if there's a user in the session
        const user = await currentUser(req)
        if (!user?.id) {
            return { error: 'Unauthorized' }
        }

        // Check if that user exists in the db
        const userFromDb = await UserService.getUserById(user.id)
        if (!userFromDb) {
            return { error: 'Unauthorized' }
        }

        // Prevent users registered with oauth providers from changing their emails
        if (user.isOAuth) {
            values.email = userFromDb.email
        }

        // Updating an email
        if (values.email && values.email !== userFromDb.email) {
            const existingUser = await UserService.getUserByEmail(values.email)

            if (existingUser) {
                return { error: 'Email already in use' }
            }

            const verificationToken = await TokensService.generateVerificationToken(values.email)


            if (verificationToken) {
                await sendVerificationEmail(user.name, verificationToken.email, verificationToken.token)
            } else {
                return { error: 'An unexpected error occurred' }
            }

            return { success: 'Verification email sent' }


        }

        // Creating password
        if (!values.hasCredentials && values.newPassword) {
            if (userFromDb.password) {
                return { error: 'You already have a password, you can not create a new one' }
            }

            const hashedPassword = await bcrypt.hash(values.newPassword, 10)
            values.password = hashedPassword
            values.newPassword = undefined

        }

        // Updating password
        if (values.password && values.newPassword) {
            if (userFromDb.password) {
                const passwordsMatch = await bcrypt.compare(
                    values.password,
                    userFromDb.password
                )

                if (!passwordsMatch) {
                    return { error: 'Incorrect password' }
                }
            }

            const hashedPassword = await bcrypt.hash(values.newPassword, 10)
            values.password = hashedPassword
            values.newPassword = undefined

        }

        values.hasCredentials = undefined

        await db.user.update({
            where: { id: userFromDb.id },
            data: { ...values }
        })

        return { success: 'Settings updated' }
    } catch (error: any) {
        return  { error: error?.message }
    }
}