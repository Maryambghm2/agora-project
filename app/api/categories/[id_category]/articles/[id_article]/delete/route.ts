import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id_article: string }> }) {
    try {

        const { id_article } = await params;
        const articleId = Number(id_article)

        const token = await getToken({ req });

        if (!token || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }

        const userId = Number(token.id)

        if (!token || isNaN(userId)) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }
        const userRole = Number(token.role);
        console.log(userRole)


        const article = await db.article.findUnique({
            where: { id_article: articleId },
        });

        if (!article) {
            return NextResponse.json({ message: "Article introuvable" }, { status: 404 });
        }
        if (article.userId !== userId && userRole !== 1) {
            return NextResponse.json({ message: "Action interdite" }, { status: 403 });
        }
        await db.article.delete({
            where: { id_article: articleId },
        });

        return NextResponse.json({ message: "Article supprimé avec succès" })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}
