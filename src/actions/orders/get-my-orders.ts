'use server'

import { currentUser } from "@/lib/auth-user"
import { db } from "@/lib/db"

export async function getMyOrders() {

    const user = await currentUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    try {
        const orders = await db.order.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            include: {
                product: true
            }
        })

        return { success: true, data: orders }
    } catch (error) {
        console.log(error);

        return { error: true, message: 'Internal server error' }
    }
}
