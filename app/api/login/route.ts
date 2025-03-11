import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export async function GET() {
    return NextResponse.json({ message: "C'est une requête GET réussie !" });
}

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        if (req.method === 'POST') {

        const { login, password } = await req.json();

        // Vérification des champs 
        if (!login || !password) {
            return NextResponse.json({ error: "L'email/nom d'utIlisateur et le mot de passe sont requis." }, {status:404})
        }


        const user = await prisma.user.findFirst({
            where: {
                OR: [{ username: login }, { mail: login }],
            },
        })

        // Vérification de l'utilisateur 
        if (!user) {
            return NextResponse.json({ error: "L'utilisateur n'existe pas." }, { status: 404 })
        }

        // Vérification du mot de passe 
        const passwordMatch = await argon2.verify(user.password, password)
        if (!passwordMatch) {
            return NextResponse.json({ error: "Le mot de passe est incorrect" })
        }

        const token = jwt.sign(
            { userId: user.id_user, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" },
        )

        return NextResponse.json({
            message: `Connexion réussie bienvenue ${user.username}`,
            token,
            user: {
                id: user.id_user,
                username: user.username,
                email: user.mail,
            },
        })
    } else {
        return NextResponse.json({ error: "La méthode de la requête doit être en POST" }, { status: 400 })
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error)
        return NextResponse.json({ error: "Erreur lors de la connexion" }, { status: 500 })
    }
}
