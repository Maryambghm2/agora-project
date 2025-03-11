import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;


export async function GET(req: Request, { params }: { params: Promise<{ id_user: string }> }) {
    try {
        const id_user = parseInt((await params).id_user);

        const notifications = await prisma.notification.findMany({
            where: { id_user: Number(id_user) },
            orderBy: { notification_date: 'desc' },
        });

        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Erreur lors de la récupération des notifications' }, { status: 500 });
    }
}


export async function PUT(req: Request, { params }: { params: Promise<{ id_notification: string }> }) {

    const id_notification = ((await params).id_notification);

    try {
        await prisma.notification.update({
            where: { id_notification: Number(id_notification) }, 
            data : { read_status: true}
        });

        return NextResponse.json({ message: "Notification marquée comme lue"});
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la modification de la notification" });
    }
}