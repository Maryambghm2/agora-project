import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET(req: NextRequest, { params }: { params: { id_category: string } }) {
    try {
        const { id_category } = await params;
        const categoryId = Number(id_category);

        // console.log(categoryId);
        if (isNaN(categoryId)) {
            return NextResponse.json({ error: "L'id de la catégorie n'est pas valide." }, { status: 400 })
        }

        // console.log("Nom de la catégorie :", categoryId);

        // Récupération de la catégorie
        const category = await db.category.findUnique({
            where: { id_category: categoryId }
        });

        if (!category) {
            return NextResponse.json({ error: "Catégorie introuvable" }, { status: 404 });
        }

        // Récupération des articles associés
        const articles = await db.article.findMany({
            where: { categoryId: categoryId },
            include: {
                user: { select: { id_user: true, username: true } },
                _count: { select: { likes: true } },
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
