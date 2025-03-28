import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id_user: string }> }) {
    try {

        const { id_user } = await params;
    const userId = Number(id_user);


        const users = await db.user.findUnique({
            where: {
                id_user: userId
            },
            select: {
                username: true, id_user: true, mail: true, roleId: true,
                role: {
                    select: {
                        name: true
                    }
                },
            }
        })
        return NextResponse.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs" }, { status: 500 });
    }
}

