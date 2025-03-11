import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;

export async function GET() {
try {
    const notifications = await prisma.notification.findMany()

    return NextResponse.json(notifications);
} catch (error) {
    return NextResponse.json({error: "Erreur lors de l'affichage des notifications"}, {status: 500});
}
}

export async function POST(req: Request) {
    const { id_user, type, message } = await req.json();


    try {
        const notification = await prisma.notification.create({
            data: { id_user, type, message, read_status: false },
        });

        return NextResponse.json(notification, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la notification" }, { status: 500 });
    }
}
