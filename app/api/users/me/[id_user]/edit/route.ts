import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { getToken } from "next-auth/jwt";

export async function PUT(req: NextRequest) {

    const token = await getToken({ req });
    try {
        if (!token || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }

        const userId = Number(token.id);

        if (!token || isNaN(userId)) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }
        const { bio } = await req.json();

        const user = await db.user.findUnique({
            where: { id_user: userId },
        });

        if (!user) {
            return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 });
        }

        const updatedBio = await db.user.update({
            where: { id_user: userId }, 
            data: {bio}
        });

        return NextResponse.json(updatedBio, { status: 201 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}
