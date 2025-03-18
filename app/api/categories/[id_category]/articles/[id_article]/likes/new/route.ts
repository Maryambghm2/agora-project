import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";

export async function POST(req: NextRequest, { params }: { params: { id_article: string } }) {
    try {
        const { id_article } = await params;
        const articleId = Number(id_article);

        if (!articleId) {
            return NextResponse.json({ error: "L'ID de l'article est requis." }, { status: 400 });
        }
        const token = await getToken({ req });

        if (!token || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }

        const userId = Number(token.id);

        // Vérifier si l'utilisateur a déjà liké l'article
        const existingLike = await db.like.findFirst({
            where: { articleId, userId }
        });

        if (existingLike) {
            // Supprimer le like existant
            await db.like.delete({
                where: { id_like: existingLike.id_like }
            });
            return NextResponse.json({ message: "Like supprimé" }, { status: 200 });
        }

        // Ajouter un nouveau like
        const newLike = await db.like.create({
            data: { articleId, userId, like_date: new Date() }
        });

        // Récupérer l’auteur de l'article
        const article = await db.article.findUnique({
            where: { id_article: articleId },
            select: { userId: true, title: true }
        });

        if (article && (userId !== article.userId)) {
            await db.notification.create({
                data: {
                    type: "like",
                    message: `Votre article "${article.title}" a reçu un like !`,
                    notification_date: new Date(),
                    read_status: false,
                    userId: article.userId
                }
            });
        }

        return NextResponse.json(newLike, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors du like" }, { status: 500 });
    }
}