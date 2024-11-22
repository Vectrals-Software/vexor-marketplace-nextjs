import { auth } from "@/auth"
import { TokensService } from "@/services/tokens-service"
import { UserService } from "@/services/user-service"
import { NextRequest } from "next/server"
import { headers } from "next/headers"
import { Session } from "next-auth"


const currentUser = async (req?: Request): Promise<Session | any> => {
    // Web requests
    if (!req) {
        const session = await auth()
        return session?.user
    }

    // Mobile or external app requests
    const headersList = await headers()
    const bearerToken = headersList.get('authorization')
    const decoded = await TokensService.verifyAuthToken(bearerToken)

    if (!decoded) {
        return null
    }

    const user = await UserService.getUserById(decoded.userId as string)

    if (!user) {
        return null
    }

    return user
}

export {
    currentUser,
}