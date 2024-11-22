'use server'

import { currentUser } from '@/lib/auth-user'
import { db } from '@/lib/db'
import { vexor } from '@/lib/vexor'
import { SupportedVexorPlatform, VexorConnectPayBody, VexorConnectResponse } from 'vexor'
import { getSellerAccountByUserId } from '../seller/get-seller-account'
import { Product } from '@prisma/client'
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate'

export async function refundOrder(orderIdentifier: string) {

    const user = await currentUser()

    if (!user) {
        throw new Error('You need to be logged in to refund an order')
    }

    const sellerAccount = await getSellerAccountByUserId(user.id)

    if (sellerAccount.error || !sellerAccount.data) {
        return { error: true, message: sellerAccount.message }
    }


    try {
        const response = await vexor.connect.refund({
            platform: sellerAccount.data.platform as SupportedVexorPlatform,
            identifier: orderIdentifier,
            seller: {
                identifier: sellerAccount.data.identifier
            }
        })

        if (response.message !== 'Success') {
            return { error: true, message: response.message }
        }

        await db.order.delete({
            where: {
                identifier: orderIdentifier
            }
        })

        revalidatePath('/my-sales')

        return { success: true, message: 'Refund successful', data: response }
    } catch (error: any) {
        console.error(error)
        return { error: true, message: error?.message || 'Internal server error' }
    }

}