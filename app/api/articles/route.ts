import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { withAuth } from "../middleware/route";

const prisma = new PrismaClient();

export const GET = async (req: any) => {
    try {
        const articles = await prisma.article.findMany({
            include: {
                user: {
                    select: {
                        id_user: true,
                        username: true,
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                },
                categories: {
                    include: {
                        category: {
                            select: {
                                id_category: true,
                                name: true
                            }
                        }
                    }
                },
            },
            
            orderBy: {
                creation_date: "desc"
            },
        });
        return NextResponse.json(articles)
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des articles" }, { status: 500 });
    }
};


// Créer un article 
export const POST = async (req: any) => {
    try {
        const { title, content } = await req.json()

        if (!content) {
            return NextResponse.json({ error: "Veuillez ajouter un contenu" }, { status: 400 })
        }

        // Création article 
        const article = await prisma.article.create({
            data: {
                title: title,
                content: content,
                id_user: req.user.id_user,
            },
        });

        return NextResponse.json(article);
    } catch (error) {
        console.error("Erreur lors de la création de l'article :", error);
        return NextResponse.json({ error: "Erreur lors de la création de l'article" }, { status: 500 });
    }
};
