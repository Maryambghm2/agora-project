import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "../../../../../../lib/db";

export async function POST(req: NextRequest, { params }: { params: { id_article: string } }) {
    try {

        const { id_article } = await params;
        const articleId = Number(id_article);


        const token = await getToken({ req });


        if (!token || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }

        const userId = Number(token.id);
        if (!userId) {
            return NextResponse.json({ error: "L'ID de l'utilisateur est requis." }, { status: 400 });
        }
        // Vérifier l'article existe 
        const articleExists = await db.article.findUnique({
            where: { id_article: articleId }
        })

        if (!articleExists) {
            return NextResponse.json({ error: "L'article n'existe pas" }, { status: 404 });
        }

        const alreadyCollection = await db.collection.findFirst({
            where: { articleId: articleId,
                userId: userId
            }
        });

        if (alreadyCollection) {
            await db.collection.deleteMany({
                where: { articleId: articleId, userId: userId }
            });
            return NextResponse.json({ message: "Article supprimé de la collection" }, { status: 200 });
        };

        
        const collection = await db.collection.create({ data: { userId: userId, articleId: articleId } })
        return NextResponse.json(collection, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'ajout à la collection" }, { status: 500 });
    }
};