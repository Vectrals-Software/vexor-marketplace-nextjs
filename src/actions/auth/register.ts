'use server'

import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { UserService } from "@/services/user-service";
import { TokensService } from "@/services/tokens-service";
import { sendVerificationEmail } from "@/services/mailing-service";

const register = async (values: z.infer<typeof RegisterSchema>) => {
    
    // Client side validation can easily be bypassed by some attacker. So we validate this on the server
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const {email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await UserService.getUserByEmail(email)

    if (existingUser) {
        return {error: "This email is already in use"}
    }

    await db.user.create({
        data: {
            name, 
            email,
            password: hashedPassword,
        }
    })


    const verificationToken = await TokensService.generateVerificationToken(email)
    
    if (verificationToken) {     
        await sendVerificationEmail(name, verificationToken.email, verificationToken.token)
    } else {
    return {error: "We couldn't send you an email, please try again"}
    }

    return {success: "We have sent you an email. Please check your inbox 🙂"}
}

export {
    register
}