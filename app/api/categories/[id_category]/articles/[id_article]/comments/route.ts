import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET({ params }: { params: { id_article: string } }) {
    try {
        const { id_article } = await params;
        const articleId = Number(id_article);

        const comments = await db.comment.findMany({
            where: {
                id_article: articleId
            },
            include: { user: true, article: true },
        });
        return NextResponse.json(comments, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'affichage des commentaires" }, { status: 500 });
    }
}

