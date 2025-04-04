import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/db";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token || Number(token.role) !== 1) {
            return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
        }

        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: "Nom requis" }, { status: 400 });
        }

        if (!token.id || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }

        const userId = Number(token.id);
        const category = await db.category.create({
            data: { name, userId }
        })
        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la création de la catégorie" }, { status: 500 })
    }
}