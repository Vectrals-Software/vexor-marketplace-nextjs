'use server'

import { currentUser } from '@/lib/auth-user'
import { db } from '@/lib/db'
import { vexor } from '@/lib/vexor'
import { SupportedVexorPlatform, VexorConnectPayBody, VexorConnectResponse } from 'vexor'
import { getSellerAccountByUserId } from '../seller/get-seller-account'
import { Product } from '@prisma/client'
import { APP_DOMAIN } from '@/lib/constants'

export async function buyProduct(product: Product) {

    const user = await currentUser()

    if (!user) {
       return { error: true, message: 'You need to be logged in to buy a product' }
    }

    const sellerAccount = await getSellerAccountByUserId(product.userId)

    if (sellerAccount.error || !sellerAccount.data) {
        return { error: true, message: sellerAccount.message }
    }

    console.log(sellerAccount.data.identifier);
    

    // In this example we are only passing one product to the purchase body but you can pass multiple products and manage the quantity. Also you can create a cart of products from different sellers. The logic can be extended as needed.
    const purchaseBody : VexorConnectPayBody = {
        items: [
            {
                title: product.title,
                description: product.description,
                quantity: 1,
                unit_price: product.price
            }
        ],
        options: {
            successRedirect: `${APP_DOMAIN}/buy`,
            failureRedirect: `${APP_DOMAIN}/buy`
        },
        seller: {
            identifier: sellerAccount.data.identifier,
            fee: '10%'
        },
        redirectUrl: `${APP_DOMAIN}/buy`
    }

    try {
        const response = await vexor.connect.pay({
            platform: sellerAccount.data.platform as SupportedVexorPlatform,
            items: purchaseBody.items,
            options: purchaseBody.options,
            redirectUrl: purchaseBody.redirectUrl,
            seller: purchaseBody.seller
        })

        console.log(response)

        await db.order.create({
            data: {
                userId: user.id,
                productId: product.id,
                identifier: response.identifier
            }
        })

        return { success: true, message: 'Order created', data: response }
    } catch (error) {
        console.error(error)
        return { error: true, message: 'Internal server error' }
    }

}