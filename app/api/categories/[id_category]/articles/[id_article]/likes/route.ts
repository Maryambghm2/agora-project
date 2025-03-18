import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function GET(req: NextRequest, { params }: { params: { id_article: string } }) {
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
        const likes = await db.like.findMany({
            where: { articleId },
            include: {
                user: { select: { id_user: true, username: true } }
            }
        });

        const usersWhoLiked = likes.map(like => like.user);
        const totalLikes = likes.length;

        return NextResponse.json({ totalLikes, usersWhoLiked }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'affichage des likes" }, { status: 500 })
    }

}