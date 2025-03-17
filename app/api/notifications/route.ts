import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../lib/db";

export async function GET(req: NextRequest) {
    const token = await getToken({ req });

    if (!token || isNaN(Number(token.sub))) {
        return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
    }

    try {
        const notifications = await db.notification.findMany({
            where: { userId: Number(token.sub) },
            orderBy: { notification_date: "desc" },
        });

        return NextResponse.json(notifications, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la récupération des notifications" }, { status: 500 });
    }
};

export async function PUT(req: NextRequest) {
    const token = await getToken({ req });

    if (!token || isNaN(Number(token.sub))) {
        return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
    }

    try {
        await db.notification.updateMany({
            where: { userId: Number(token.sub), read_status: false },
            data: { read_status: true },
        });

        return NextResponse.json({ message: "Notifications marquées comme lues" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la mise à jour des notifications" }, { status: 500 });
    }
}