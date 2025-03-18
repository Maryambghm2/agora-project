import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id_article: string }> }) {
    try {

        const { id_article } = await params;
        const articleId = Number(id_article)

        const token = await getToken({ req });

        if (!token || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }

        const userId = Number(token.id);

        if (!token || isNaN(userId)) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }
        const { title, content } = await req.json();

        const article = await db.article.findUnique({
            where: { id_article: articleId },
        });

        if (!article) {
            return NextResponse.json({ message: "Article introuvable" }, { status: 404 });
        }
        const authorArticle = await db.article.findFirst({
            where: { id_article: articleId, userId }
        })

        if (authorArticle) {

            const updatedArticle = await db.article.update({
                where: { id_article: articleId },
                data: { title, content, modification_date: new Date() },
            });

            return NextResponse.json(updatedArticle, { status: 201 })
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}
