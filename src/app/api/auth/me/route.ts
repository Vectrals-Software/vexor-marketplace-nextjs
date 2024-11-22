import { currentUser } from "@/lib/auth-user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const user = await currentUser(req)

    if (!user) {
        return new NextResponse(null, { status: 404 })
    }

    return new NextResponse(JSON.stringify(user), { status: 200 })
}