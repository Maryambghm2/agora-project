import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { withAuth } from "../../middleware/route";

const prisma = new PrismaClient();

// Route pour article spécifique 
export async function GET(req: Request, { params }: { params: Promise<{ id_article: string }> }) {
    const id_article = parseInt((await params).id_article);

    if (isNaN(id_article)) {
        NextResponse.json({ error: "L'id n'est pas valide." }, { status: 400 })
    }
    try {
        const article = await prisma.article.findUnique({
            where: { id_article: Number(id_article) },
            include: {
                user: {
                    select: {
                        id_user: true,
                        username: true,
                    },
                },
                _count: {
                    select: {
                        likes: true
                    }
                },
                likes: {
                    include: {
                        user_likes: {
                            include: {
                                user: {
                                    select: {
                                        id_user: true, username: true
                                    }
                                }
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
                categories: {
                    select: {
                        category: {
                            select: {
                                id_category: true,
                                name: true
                            }
                        }
                    }
                }
            },
        });
        return NextResponse.json(article)
    } catch (error) {
        console.error("Erreur lors de l'affichage de l'article:", error)
        return NextResponse.json({ error: "Erreur lors de l'affichage de l'article" }, { status: 500 })
    }
}

// Route modifier article 
export const PUT = withAuth(async (req: any, { params }: { params: Promise<{ id_article: string }> }) => {

    const id_article = parseInt((await params).id_article)

    // Vérifier si l'article ID est valide
    if (isNaN(id_article)) {
        return NextResponse.json({ error: "ID de l'article invalide" }, { status: 400 });
    }
    try {

        const { title, content } = await req.json();

        // Vérifier que les champs title et content existent
        if (!content) {
            return NextResponse.json({ error: "Veuillez fournir un contenu" }, { status: 400 });
        }

        const article = await prisma.article.findUnique({
            where: { id_article },
        });

        if (!article) {
            return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
        }

        if (article.id_user !== req.user.id_user) {
            return NextResponse.json({ error: "Vous n'avez pas l'autorisation de modifier cet article" }, { status: 403 });
        }

        // Mettre à jour l'article
        const updatedArticle = await prisma.article.update({
            where: { id_article: Number(id_article) },
            data: { title, content, modification_date: new Date() },
        });

        return NextResponse.json(updatedArticle);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'article :", error);
        return NextResponse.json({ error: "Erreur lors de la mise à jour de l'article" }, { status: 500 });
    }
});

// Route supprimer article 
export const DELETE = withAuth(async (req: any, { params }: { params: Promise<{ id_article: string }> }) => {
    const id_article = parseInt((await params).id_article);
    try {
        if (isNaN(id_article) || (!isFinite(id_article))) {
            return NextResponse.json({ error: 'Veuillez entrez un id valide' }, { status: 400 });
        }
        const verifArticle = await prisma.article.findUnique({
            where: { id_article: Number(id_article) },
        });

        if (!verifArticle) {
            return NextResponse.json({ message: `L'id ${id_article} n'existe pas.` }, { status: 400 });
        }


        const userRole = req.user?.role.name;
        if (verifArticle.id_user !== req.user?.id_user && userRole !== 'Administrateur' && userRole !== 'Modérateur') {
            return NextResponse.json({ error: "Vous n'êtes pas autorisé à supprimer cet article" }, { status: 403 });
        }
        // Suppression de l'article 
        await prisma.article.delete({
            where: { id_article: Number(id_article) }
        });
        return NextResponse.json({ message: `Article ${id_article} supprimé` })
    } catch (error) {
        console.error("Erreur lors de la suppression de l'article: ", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
});