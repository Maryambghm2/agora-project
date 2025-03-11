import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs" }, { status: 500 });
    }
}