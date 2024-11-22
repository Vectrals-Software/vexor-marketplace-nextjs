import { currentUser } from "@/lib/auth-user";
import { UserRoles } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await currentUser()

    if (!user) {
        return new NextResponse(null, { status: 500 })
    }

    if (user.role === UserRoles.ADMIN) {
    return new NextResponse(null, { status: 200 })
        
    }

    return new NextResponse(null, { status: 403 })
}