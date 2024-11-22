import { db } from '@/lib/db';
import { vexor } from '@/lib/vexor';
import { NextResponse } from 'next/server';
 
export async function POST(req: Request) {
 
    const response = await vexor.webhook(req);
 
    console.log('Webhook received', response);

    switch (response.eventType) {
        case 'account.updated':
            if (response.platform === 'stripe') {

                const updatedConnectedAccount = await db.connectedGatewayAccount.update({
                    where: {
                        identifier: response.identifier
                    },
                    data: {
                        isActive: response.resource.capabilities.transfers === 'active'
                    }
                })
            
                console.log(updatedConnectedAccount);
            }
            break;
        case 'checkout.session.completed':
            // Here you can handle the checkout session completed event, maybe update an order status, send a notification, etc.
            break;
        default:
            console.log(`Unhandled event type. Add the necessary logic for this event type in the webhook route to match your application's needs. Event type: ${response.eventType}`);
            break;
    }

   
 
    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
}