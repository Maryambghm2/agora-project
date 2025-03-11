import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();


export async function GET() {
    try {
        const permissions = await prisma.permission.findMany()
        return NextResponse.json(permissions);

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'affichage des permsissions" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {

        const { name, write_permission, read_permission } = await req.json();

        if (!name || write_permission === undefined || read_permission === undefined) {
            return NextResponse.json({ error: "Tout les champs (name, write_permission, read_permission) sont requis" }, { status: 400 })
        }
        const permisionExists = await prisma.permission.findUnique({
            where: { name }
        });

        if (permisionExists) {
            return NextResponse.json({ error: "Cette permission existe déja." }, { status: 400 })
        }

        const newPermission = await prisma.permission.create({
            data: {
                name,
                write_permission,
                read_permission
            }
        });

        return NextResponse.json(newPermission, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la création de la permission." }, { status: 500 })
    }
}