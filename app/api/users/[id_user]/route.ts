import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { withAuth } from "../../middleware/route";


const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: Promise<{ id_user: string }> }) => {
    const id_user = parseInt((await params).id_user)
    try {
        const user = await prisma.user.findUnique({
            where: { id_user: Number(id_user) },
            include: {
                articles: {
                    select: {
                        id_article: true,
                        title: true,
                        content: true,
                    }
                },
                social_networks: {
                    select: {
                        id_network: true,
                        name: true,
                        link: true
                    }

                }
            }
        })

        if (!user) {
            return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
        }


        return NextResponse.json(user)
    } catch (error) {
        console.error("Erreur lors de l'affichage de l'utilisateur:", error)
        return NextResponse.json({ error: "Erreur lors de l'affichage de l'utilisateur" }, { status: 500 })
    }

};