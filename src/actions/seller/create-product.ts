'use server'

import { currentUser } from "@/lib/auth-user"
import { db } from "@/lib/db"
import { ProductSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import { z } from "zod"


export const createProduct = async (data: z.infer<typeof ProductSchema>) => {
    const user = await currentUser()
    if (!user) {
        throw new Error('Unauthorized')
    }

    try {
        const product = await db.product.create({
            data: {
                ...data,
                userId: user.id
            }
        })

        revalidatePath('/sell')
        return { success: true, message: 'Product created successfully', data: product }


    } catch (error) {
        console.error(error)
        return {error: true, message: 'Failed to create product'}
    }
}