import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;


export async function GET() {
    const comments = await prisma.comment.findMany({
        include: { user: true, article: true },
    });
    return NextResponse.json(comments, { status: 200 })
}

