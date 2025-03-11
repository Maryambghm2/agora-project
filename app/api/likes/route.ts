import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;


export async function POST(req: Request) {
    const { id_user, id_article } = await req.json();

    try {
        const ExistingLike = await prisma.userLike.findFirst({
            where: { id_user, like: { id_article } },
        });

        if (ExistingLike) {
            await prisma.userLike.delete({ where: { id_user_id_like: { id_user, id_like: ExistingLike.id_like } } })
            return NextResponse.json({ message: "Like supprimé" }, { status: 200 });
        }

        const newLike = await prisma.like.create({
            data: { id_article, user_likes: { create: { id_user } } },
        });

        return NextResponse.json(newLike, {status: 201});
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors du like' }, { status: 500 })
    }


}
