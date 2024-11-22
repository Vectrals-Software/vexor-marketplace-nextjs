import { updateSettings } from "@/actions/settings/update-settings";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data  = await req.json()
    const res = await updateSettings(data, req)    
    return new NextResponse(JSON.stringify(res))
}