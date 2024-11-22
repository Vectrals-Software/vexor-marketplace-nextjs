import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const db = globalThis.prisma || new PrismaClient()

// Needed because Next.js hot reload. If we do not do this we would have different instances of PrismaClient. // global is not affected by hot reload
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db
}

export {
    db
}