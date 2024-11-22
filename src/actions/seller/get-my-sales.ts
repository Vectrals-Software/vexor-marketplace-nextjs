'use server'

import { currentUser } from "@/lib/auth-user"
import { db } from "@/lib/db"

export async function getMySales() {

    const user = await currentUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    try {

        // Get the orders that include the product that belongs to the user
        const soldProducts = await db.order.findMany({
            where: { product: { userId: user.id } },
            orderBy: { createdAt: 'desc' },
            include: { product: true }
        })

        return { success: true, data: soldProducts }
    } catch (error) {
        console.log(error);

        return { error: true, message: 'Internal server error' }
    }
}
