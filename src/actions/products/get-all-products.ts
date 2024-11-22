'use server'

import { db } from "@/lib/db"

export async function getAllProducts() {

    try {
        const products = await db.product.findMany({
            orderBy: { createdAt: 'desc' } , 
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return { success: true, data: products }
    } catch (error) {
        console.log(error);

        return { error: true, message: 'Internal server error' }
    }
}
