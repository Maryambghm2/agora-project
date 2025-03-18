import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "../../../../lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id_article: string }> }) {
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

        if (!userId) {
            return NextResponse.json({ error: "L'ID de l'utilisateur est requis." }, { status: 400 });
        }

        const collections = await db.collection.findMany({
            where: { userId, articleId },
            include: {
                article: {
                    select: {
                        id_article: true,
                        title: true,
                        content: true,
                        creation_date: true,
                        modification_date: true,

                        category: {
                            select: {
                                id_category: true,
                                name: true,
                            }

                        }
                    },
                }, user: {
                    select: {
                        username: true,
                    }
                },
            },
        })
        // console.log(collections)
        return NextResponse.json(collections, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur sur l'affichage de la collection" }, { status: 500 })
    }
}


