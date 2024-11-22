'use client'
import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { buyProduct } from '@/actions/products/buy-product'
import { Product } from '@prisma/client'
import { refundOrder } from '@/actions/orders/refund-order'
import { toast } from 'sonner'

const RefundOrderButton = ({ orderIdentifier }: { orderIdentifier: string }) => {

    const [isPending, startTransition] = useTransition()

    const handleBuy = async () => {
        startTransition(async () => {
           const response = await refundOrder(orderIdentifier)
           if (response.success) {
               toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        })
    }

    return (
        <Button onClick={handleBuy} disabled={isPending}>{isPending ? 'Refunding...' : 'Refund'}</Button>
    )
}

export default RefundOrderButton