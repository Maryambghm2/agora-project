import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;


export async function GET() {
    const comments = await prisma.comment.findMany({
        include: { user: true, article: true },
    });
    return NextResponse.json(comments, { status: 200 })
}

export async function POST(req: Request) {
    const { content, id_user, id_article } = await req.json();

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                id_user,
                id_article
            },
        });
        return NextResponse.json(comment, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'ajout du commentaire" }, { status: 500 });
    }
}