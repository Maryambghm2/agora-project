import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";

// Créer un article 
export async function POST(req: NextRequest, { params }: { params: Promise<{ id_category: string }> }) {
    try {

        const { id_category } = await params;
        const categoryId = Number(id_category);


        const token = await getToken({ req });

        if (!token || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }

        const userId = Number(token.id);


        const { title, content } = await req.json();

        if (!title || !content) {
            return NextResponse.json({ error: "Veuillez ajouter un titre et un contenu" }, { status: 400 })
        }

        // Création article 
        const article = await db.article.create({
            data: {
                title,
                content,
                userId,
                creation_date: new Date(),
                categoryId: categoryId,
            },
            include: {
                user: {
                    select: {
                        id_user: true,
                        username: true,
                        mail: true
                    },
                },
            },
        });

        console.log(token);
        console.log({ title, content })
        return NextResponse.json({ article }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la création de l'article" }, { status: 500 });
    }
}
