'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { useTransition } from 'react'
import { cn } from "@/lib/utils"
import { connectAccount } from '@/actions/seller/connect-account'

const ConnectAccount = () => {
    const [isPending, startTransition] = useTransition()

    const paymentGateways = [
        {
            id: 'stripe',
            name: 'Stripe',
            enabled: true,
            description: 'Connect your Stripe account to sell your products'
        },
        {
            id: 'mercadopago',
            name: 'MercadoPago',
            enabled: true,
            description: 'Connect your MercadoPago account to sell your products'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            enabled: false,
            description: 'Connect your PayPal account to sell your products'
        }
    ]

    const handleConnect = (gatewayId: string) => {
        startTransition(async () => {
            const response = await connectAccount(gatewayId)
            console.log(response);
            if (response.success && response.data?.connect_url) {
                window.location.href = response.data.connect_url
            }
        })
    }

    return (
        <div className="w-full max-w-6xl flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-center mb-8">Connect your payment gateway</h1>
            <div className="w-full grid gap-4">
                {paymentGateways.map((paymentGateway) => (
                    <Card
                        key={paymentGateway.id}
                        onClick={() => paymentGateway.enabled && handleConnect(paymentGateway.id)}
                        className={cn(
                            "transition-all duration-200 hover:border hover:border-green-500",
                            paymentGateway.enabled
                                ? "cursor-pointer hover:shadow-md"
                                : "opacity-50 cursor-not-allowed bg-gray-100",
                            isPending && "opacity-50 cursor-wait"
                        )}
                    > 
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">{paymentGateway.name}</h3>
                                    <p className="text-muted-foreground">{paymentGateway.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">
                                        {paymentGateway.enabled ? 'Connect' : 'Not available'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ConnectAccount