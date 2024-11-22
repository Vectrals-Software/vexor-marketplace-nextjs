'use server '

import { currentUser } from '@/lib/auth-user'
import { db } from '@/lib/db'

export async function getSellerAccountByUserId(userId: string) {

    const connectedAccount = await db.connectedGatewayAccount.findFirst({
        where: { userId, isActive: true }
    })

    if (!connectedAccount) {
        return { error: true, message: 'No connected account found' }
    }

    return { success: true, message: 'Connected account found', data: connectedAccount }
}