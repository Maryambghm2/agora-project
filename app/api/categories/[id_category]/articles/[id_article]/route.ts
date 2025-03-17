import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(req: NextRequest, { params }: { params: { id_article: string } }) {
    try {

        const { id_article } = await params;
        const articleId = Number(id_article);

        // console.log(articleId)
        if (isNaN(articleId)) {
            return NextResponse.json({ error: "L'id n'est pas valide." }, { status: 400 })
        }

        const article = await db.article.findUnique({
            where: { id_article: articleId },
            include: {
                user: {
                    select: {
                        id_user: true,
                        username: true,
                        likes: true
                    },
                },
                _count: {
                    select: {
                        likes: true
                    }
                },
                likes: {
                    include: {
                        user: {
                            select: {
                                id_user: true, username: true
                            }
                        }
                    }

                },
                comments: {
                    select: {
                        id_comment: true,
                        creation_date: true,
                        content: true,
                        user: {
                            select: {
                                id_user: true,
                                username: true,
                            }
                        }
                    },
                    orderBy: { creation_date: "desc" }
                },
            },
        });

        if (!article) {
            return NextResponse.json({ error: "Article introuvable" }, { status: 404 })
        }
        // console.log(article)
        return NextResponse.json(article)
    } catch (error) {
        console.error("Erreur lors de l'affichage de l'article:", error)
        return NextResponse.json({ error: "Erreur lors de l'affichage de l'article" }, { status: 500 })
    }
}