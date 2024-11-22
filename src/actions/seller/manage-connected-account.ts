'use server'

import { currentUser } from "@/lib/auth-user"
import { db } from "@/lib/db"
import { vexor } from "@/lib/vexor"

export const manageConnectedAccount = async (account_identifier: string) => {
    
    const user = await currentUser()
    if (!user) {
        throw new Error('Unauthorized')
    }

    const response = await vexor.connect.dashboard({account_identifier})

    console.log(response)
    return { success: true, message: 'Account connected successfully', data: response }
}