import { db } from "@/lib/db"

const getAccountsByUserId = async (userId: string) => {
    try {
        const accounts = await db.account.findMany({ where: { userId } })
        return accounts
    } catch (error) {
        return null
    }
}

export const AccountsService = {
    getAccountsByUserId
}