import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;


export async function POST(req: Request, { params }: { params: Promise<{ id_article: string }> }) {
    const id_article = parseInt((await params).id_article);
    const { content, id_user } = await req.json();


    if (isNaN(id_article)) {
        return NextResponse.json({ error: "Contenu manquant" }, { status: 400 });
    }

    if (!content) {
        return NextResponse.json({ error: "ID de l'article invalide" }, { status: 400 });
    }
    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                id_user,
                id_article
            },
        });

        // Récupérer l'auteur de l'article 
        const article = await prisma.article.findUnique({
            where: { id_article },
            select: { id_user: true },
        });

        if (article) {

            // Envoyer une notification à l'auteur 
            await prisma.notification.create({
                data: {
                    type: "comment",
                    message: "Vous avez reçu un nouveau commentaire sur votre article.",
                    notification_date: new Date(),
                    read_status: false,
                    id_user: article.id_user,
                },
            });
        }
        return NextResponse.json(comment, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'ajout du commentaire" }, { status: 500 });
    }
}