import { NextResponse } from "next/server";
import { db } from "../lib/db";


export async function GET() {
    try {
        const users = await db.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs" }, { status: 500 });
    }
}

