'use server'

import { currentUser } from "@/lib/auth-user"
import { UserRoles } from "@/lib/constants"

export const adminExampleAction = async () => {
    const user = await currentUser()

    if (!user) {
        return { error: 'Oops! Something happened' }
    }

    if (user.role !== UserRoles.ADMIN) {
        return { error: 'You are not allowed to call this server action' }
    }

    return { success: 'You are allowed to call this server action' }

}