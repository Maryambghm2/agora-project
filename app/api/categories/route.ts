import { NextResponse } from "next/server";
import { db } from "../lib/db";

export async function GET() {
    try {
        const categories = await db.category.findMany({})

        return NextResponse.json(categories, { status: 200 });


    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'affichage des catégories" }, { status: 500 });
    }
}
