'use server'

import { currentUser } from "@/lib/auth-user"
import { db } from "@/lib/db"

export async function getMyProducts() {

    const user = await currentUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    try {
        const products = await db.product.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }  
        })

        return { success: true, data: products }
    } catch (error) {
        console.log(error);

        return { error: true, message: 'Internal server error' }
    }
}
