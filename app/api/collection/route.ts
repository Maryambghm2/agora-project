import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient
export async function POST(req: Request, { params } : {params: Promise<{ id_user: string, id_article: string}>} ) {
    try {
        const {id_user, id_article} = await req.json();

        const collection = await prisma.collection.create({ data: { id_user, id_article}})
        return NextResponse.json(collection);
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'ajout à la collection"}, {status: 500});
    }
}