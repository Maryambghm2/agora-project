import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req: Request, { params} : { params: Promise<{ id_category: string}>}) {
    try {
        const id_category = parseInt((await params).id_category);

        const category = await prisma.category.findMany({
            where: { id_category }
        })

        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'affichage des catégories" }, { status: 500 });
    }
}