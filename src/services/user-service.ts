import { db } from "@/lib/db";
import bcrypt from 'bcryptjs'
  
const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } })
        /* const userWithoutPassword = exclude(user, ['password'])
        return userWithoutPassword */
        return user
    } catch (error) {
        return null
    }
}

const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } })
       /*  const userWithoutPassword = exclude(user, ['password'])
        return userWithoutPassword */
        return user
    } catch (error) {
        return null
    }
}

const verifyUserEmail = async (id: string, email: string, tokenId: string) => {
    try {
        const user = await db.user.update(
            {
                where: { id },
                data: {
                    emailVerified: new Date(),
                    email: email
                }
            },
        )

        await db.verificationToken.delete({where: {id: tokenId}})
        return user
    } catch (error) {
        return null
    }
}


/**
 * Updates the password for a user.
 *
 * @param {string} id - The unique identifier of the user.
 * @param {string} password - The new password to be set.
 * @param {string} tokenId - The unique token id generated to reset the password.
 */
const createNewPassword = async (id: string, password: string, tokenId?: string) => {
    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await db.user.update(
            {
                where: { id },
                data: {
                    password: hashedPassword
                }
            },
        )

        await db.passwordResetToken.delete({where: {id: tokenId}})
        return {success: "Password updated successfully"}
    } catch (error) {
        return null
    }
}


export const UserService = {
    getUserByEmail,
    getUserById,
    verifyUserEmail,
    createNewPassword
}