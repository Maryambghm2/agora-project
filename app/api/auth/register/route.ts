import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();
export async function POST(req: Request) {
    try {
        const { username, mail, password } = await req.json();

        // Vérification des champs
        if (!username || !mail || !password) {
            return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 });
        }

        // Vérification de la longueur du nom d'utilisateur
        if (username.length < 3 || username.length > 25) {
            return NextResponse.json({ error: "Le nom d'utilisateur doit contenir entre 3 et 25 caractères." }, { status: 400 });
        }

        // Vérification du mot de passe avec regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$ %^&*-]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json({ error: "Le mot de passe doit comporter au moins 8 caractères et inclure: une majuscule, une minuscule, un chiffre et un caractère spécial." }, { status: 400 });
        }

        // Vérification de la longueur du mot de passe
        if (password.length > 100) {
            return NextResponse.json({ error: "Le mot de passe est trop long (maximum 100 caractères)." }, { status: 400 });
        }

        // Vérification du format de l'email
        const mailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        if (!mailRegex.test(mail)) {
            return NextResponse.json({ error: "Le format de l'email est invalide." }, { status: 400 });
        }

        // Vérification de la longueur de l'email
        if (mail.length > 255) {
            return NextResponse.json({ error: "L'email est trop long (maximum 255 caractères)." }, { status: 400 });
        }

        // Vérification si le nom d'utilisateur est déjà utilisé
        const usernameCheck = await prisma.user.findFirst({
            where: { username: username }
        });
        if (usernameCheck) {
            return NextResponse.json({ error: "Le nom d'utilisateur est déjà utilisé, veuillez en insérer un autre." }, { status: 400 });
        }

        // Vérification si l'email est déjà utilisé
        const mailCheck = await prisma.user.findFirst({
            where: { mail: mail }
        });
        if (mailCheck) {
            return NextResponse.json({ error: "L'email est déjà utilisé, veuillez en insérer un autre." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const user = await prisma.user.create({
            data: {
                username,
                mail,
                password: hashedPassword,
                roleId: 2,

            },
        });
        return NextResponse.json({ message: "Utilisateur créé avec succès !", user }, { status: 201 });

    } catch (error) {
        console.error("Erreur lors de l'inscription:", error)
        return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 })
    }
}