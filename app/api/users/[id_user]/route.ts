import { NextRequest, NextResponse } from "next/server";
import { db } from "../../lib/db";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    try {

        const token = await getToken({ req });

        if (!token || isNaN(Number(token.id))) {
            return NextResponse.json({ error: "ID utilisateur invalide" }, { status: 400 });
        }
        const users = await db.user.findUnique({
            where: {
                id_user: Number(token.id)
            },
            select: {
                username: true, id_user: true, mail: true, roleId: true,
                role: {
                    select: {
                        name:true
                    }
                },
                social_networks: {
                    select: {
                        name: true,
                        link: true,
                        
                    }
                }
            }
        })
        return NextResponse.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs" }, { status: 500 });
    }
}

