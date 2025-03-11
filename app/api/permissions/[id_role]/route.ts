import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

// Afficher permission d'un role 
export async function GET(req: Request, { params }: { params: Promise<{ id_role: string }> }) {
    try {
        const id_role = ((await params).id_role);

        const permissions = await prisma.permissionsRole.findMany({
            where: { id_role: (Number(id_role)) },
            include: {
                permission: {
                    select: {
                        name: true,
                        write_permission: true,
                        read_permission: true
                    }
                    ,
                }
            }
        })

        return NextResponse.json(permissions);
    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de l'affichage des permissions par roles" }, { status: 500 });
    }
}


// Ajouter une permission à un role 
export async function POST(req: Request, { params }: { params: Promise<{ id_role: string }> }) {
    try {
        const id_role = parseInt((await params).id_role);
        const { id_permission }  = await req.json();
        
        const roleExists = await prisma.role.findUnique({
            where: { id_role}
        });

        if (!roleExists) {
            return NextResponse.json({ error: "Le role spécifié n'existe pas"}, {status: 400});
        }

const permisionExists = await prisma.permission.findUnique({
    where: { id_permission },
});

if (!permisionExists) {
    return NextResponse.json({ error: "La permission n'existe pas."}, { status: 400})
}

        const newPermissionRole = await prisma.permissionsRole.create({
            data: {
                id_role,
                id_permission
            }
        })

     return NextResponse.json(newPermissionRole, {status: 201})

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la modification des permissions par roles" }, { status: 500 });
    }

}