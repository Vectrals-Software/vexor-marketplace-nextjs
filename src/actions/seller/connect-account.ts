'use server'

import { currentUser } from '@/lib/auth-user'
import { APP_DOMAIN } from '@/lib/constants'
import { db } from '@/lib/db'
import { vexor } from '@/lib/vexor'
import { SupportedVexorPlatform, VexorConnectResponse } from 'vexor'

export async function connectAccount(gatewayId: string) {

    const user = await currentUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    const redirectUrl = gatewayId === 'mercadopago' ? 
    `${APP_DOMAIN}/sell/connect-mercadopago` : 
    `${APP_DOMAIN}/sell`

    try {
        const response : VexorConnectResponse = await vexor.connect({
            platform: gatewayId as SupportedVexorPlatform,
            redirectUrl,
            countryCode: 'AR',
            express: true
        });

        const connectedAccount = await db.connectedGatewayAccount.create({
            data: {
                identifier: response.identifier,
                platform: gatewayId,
                countryCode: 'AR',
                userId: user.id
            }
        })

        console.log(response.connect_url);
        console.log(connectedAccount);
        
        
        return { success: true, message: 'Account connected successfully', data: response }
    } catch (error) {
        console.error(error)
        return { error: true, message: 'Internal server error' }
    }

}

export async function getMercadoPagoCredentials(url: string) {
    const user = await currentUser()

    if (!user) {
        throw new Error('Unauthorized')
    }

    try {
        const response = await vexor.connect.auth({url});
        console.log('Vexor response', response);

        // First try to find the existing account
        const existingAccount = await db.connectedGatewayAccount.findUnique({
            where: {
                identifier: response.identifier
            }
        });

        // If the account doesn't exist, return an error
        if (!existingAccount) {
            return { error: true, message: 'Connected account not found' }
        }

        // Update the account
        const updatedAccount = await db.connectedGatewayAccount.update({
            where: {
                identifier: response.identifier
            },
            data: { isActive: true }
        });

        return { success: true, message: 'Account connected successfully', data: updatedAccount }
    } catch (error) {
        console.error('Detailed error:', error)
        return { error: true, message: 'Internal server error' }
    }
}