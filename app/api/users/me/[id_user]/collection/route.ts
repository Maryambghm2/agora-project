import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "../../../../lib/db";

export async function GET(req: NextRequest) {
    try {

        const token = await getToken({ req });

        if (!token || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }

        const userId = Number(token.id);

        if (!userId) {
            return NextResponse.json({ error: "L'ID de l'utilisateur est requis." }, { status: 400 });
        }

        const collections = await db.collection.findMany({
            where: { userId },
            include: {
                article: {
                    select: {
                        id_article: true,
                        title: true,
                        content: true,
                        creation_date: true,
                        modification_date: true,
                        userId: true,

                        category: {
                            select: {
                                id_category: true,
                                name: true,
                            }

                        },
                        user: {
                            select: {
                                username: true
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
        return NextResponse.json(collections, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur sur l'affichage de la collection" }, { status: 500 })
    }
};



export async function DELETE(req: NextRequest) {
    try {
        const { id_article } = await req.json();
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


        const collectionEntry = await db.collection.findFirst({
            where: { articleId, userId }
        });

        if (!collectionEntry) {
            return NextResponse.json({ error: "L'article n'est pas dans la collection" }, { status: 400 });
        }

        await db.collection.deleteMany({
            where: { userId, articleId }
        });
        return NextResponse.json({ message: "Article supprimé de la collection" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la suppression de la collection" }, { status: 500 });
    }
}