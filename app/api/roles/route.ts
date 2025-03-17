import { NextResponse } from "next/server";
import { db } from "../lib/db";

export async function GET() {
    try {
        const roles = await db.role.findMany()

        return NextResponse.json(roles, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'affichage des roles" }, { status: 500 });
    }
}

