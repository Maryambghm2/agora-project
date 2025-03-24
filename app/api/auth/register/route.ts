import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     description: Cette route permet de créer un nouvel utilisateur en validant les informations fournies, telles que le nom d'utilisateur, l'email et le mot de passe. Si les informations sont valides, l'utilisateur est enregistré dans la base de données avec un mot de passe haché.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur de l'utilisateur.
 *                 example: "nouvelUtilisateur"
 *               mail:
 *                 type: string
 *                 description: Email de l'utilisateur.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur.
 *                 example: "MotDePasse123!"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur créé avec succès !"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_user:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "nouvelUtilisateur"
 *                     mail:
 *                       type: string
 *                       example: "user@example.com"
 *       400:
 *         description: Erreur de validation des données d'entrée (champs manquants, format incorrect, etc.)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tous les champs sont obligatoires."
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de l'inscription"
 */


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