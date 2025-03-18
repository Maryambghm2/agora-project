import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function GET(req: Request, { params }: { params: Promise<{ id_user: string }> }) {
    const { id_user } = await params;
    const userId = Number(id_user);


    if (isNaN(userId)) {
        return NextResponse.json({ error: "ID utilisateur invalide." }, { status: 400 });
    }

    try {
        const articlesUser = await prisma.article.findMany({
            where: { userId: Number(userId) },
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (articlesUser.length === 0) {
            return NextResponse.json({ error: "Pas d'article existant pour cet utilisateur" }, { status: 400 })
        }

        return NextResponse.json(articlesUser);

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'affichage des articles d'un utilisateur" }, { status: 500 })
    }

};