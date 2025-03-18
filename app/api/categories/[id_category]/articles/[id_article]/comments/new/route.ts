import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";

export async function POST(req: NextRequest, { params }: { params: { id_article: string } }) {
    try {
        const { id_article } = await params;
        const articleId = Number(id_article);


        if (isNaN(articleId)) {
            return NextResponse.json({ error: "Identifiant non valide" }, { status: 400 });
        }

        const { content } = await req.json();

        const token = await getToken({ req });

        if (!token || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }

        const userId = Number(token.id);

        if (!content) {
            return NextResponse.json({ error: "Veuillez mettre un contenu" }, { status: 400 });
        }

        const comment = await db.comment.create({
            data: {
                content,
                userId,
                articleId: articleId,
                creation_date: new Date()
            },
        });

        // Récupérer l'auteur de l'article 
        const article = await db.article.findUnique({
            where: { id_article: articleId },
            select: { userId: true, title: true },
        });

        if (article && (userId !== article.userId)) {

            // Envoyer une notification à l'auteur 
            await db.notification.create({
                data: {
                    type: "comment",
                    message: `Vous avez reçu un nouveau commentaire sur votre article ${article.title}.`,
                    notification_date: new Date(),
                    read_status: false,
                    userId: article.userId,
                },
            });
        }
        return NextResponse.json(comment, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'ajout du commentaire" }, { status: 500 });
    }
};