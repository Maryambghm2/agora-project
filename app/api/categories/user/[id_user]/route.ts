import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: Promise<{ id_user: string }> }) {
    try {
        const id_user = parseInt((await params).id_user);
        const { name } = await req.json()

        // Vérifier si l'ID utilisateur est valide
        if (isNaN(id_user)) {
            return NextResponse.json({ error: "L'ID utilisateur fourni est invalide." }, { status: 400 });
        }

        if (!name || name.trim() === '') {
            return NextResponse.json({ error: "Le nom de la catégorie est requis." }, { status: 400 });
        }

        // Vérifier si l'utilisateur existe
        const userExists = await prisma.user.findUnique({
            where: { id_user }
        });

        if (!userExists) {
            return NextResponse.json({ error: "L'utilisateur spécifié n'existe pas." }, { status: 400 });
        }

        // Vérifier si la catégorie existe déjà
        const categoryExists = await prisma.category.findFirst({
            where: { name }
        });

        if (categoryExists) {
            return NextResponse.json({ error: "Cette catégorie existe déjà." }, { status: 400 });
        }

       

        const newCategory = await prisma.category.create({
            data: { name }
        });

        
        await prisma.createdCategory.create({
            data: {
                id_user,
                id_category: newCategory.id_category
            }
        });

        return NextResponse.json(newCategory, { status: 201})

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Erreur lors de la création de la catégorie" }, { status: 500 });
    }
}
