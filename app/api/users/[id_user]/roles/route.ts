import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

async function PUT(req: Request, { params }: { params: Promise<{ id_user: string }> }) {

    try {
        const id_user = ((await params).id_user)
        const { id_role } = await req.json();

        const updatedUser = await db.user.update({
            where: {
                id_user: Number(id_user),
            },
            data: {
                roleId: Number(id_role),
            }
        });
        return NextResponse.json(updatedUser, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
    }

}