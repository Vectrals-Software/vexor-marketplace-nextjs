'use client'
import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { buyProduct } from '@/actions/products/buy-product'
import { Product } from '@prisma/client'

const BuyProductBtn = ({ product }: { product: Product }) => {

    const [isPending, startTransition] = useTransition()

    const handleBuy = async () => {
        startTransition(async () => {
           const response = await buyProduct(product)
           if (response.success) {
               console.log(response.data);

               window.location.href = response.data.payment_url
            }
        })
    }

    return (
        <Button onClick={handleBuy} disabled={isPending}>{isPending ? 'Buying...' : 'Buy'}</Button>
    )
}

export default BuyProductBtn