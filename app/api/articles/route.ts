import { NextRequest, NextResponse } from "next/server";
import { db } from "../lib/db";

export async function GET(req: NextRequest) {
    try {

        // Récupération des articles associés
        const articles = await db.article.findMany({
            include: {
                user: { select: { id_user: true, username: true } },
                _count: { select: { likes: true } },
                category: {
                    select: {
                        id_category: true,
                        name: true
                    }
                }
            },
        });

        if (articles.length === 0) {
            return NextResponse.json({ message: "Aucun article trouvé pour cette catégorie." }, { status: 200 });
        }

        return NextResponse.json(articles);
    } catch (error) {
        console.error("Erreur lors de l'affichage des articles:", error);
        return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
    }
}
