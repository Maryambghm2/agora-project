import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.category.findMany({})

        return NextResponse.json(categories, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'affichage des catégories" }, { status: 500 });
    }
}
