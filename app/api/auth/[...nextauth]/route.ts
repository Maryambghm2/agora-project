import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

const prisma = new PrismaClient();

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                mail: { label: "Email", type: "text", placeholder: "johndoe@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.mail || !credentials?.password) {
                    throw new Error("Email et mot de passe requis !");
                }

                const user = await prisma.user.findUnique({
                    where: { mail: credentials.mail },
                });

                if (!user) {
                    throw new Error("Utilisateur non trouvé !");
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordMatch) {
                    throw new Error("Mot de passe incorrect !");
                }

                return {
                    id: user.id_user.toString(),
                    name: user.username,
                    mail: user.mail,
                    role: user.roleId,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            session.user = session.user || {};
            session.user.id = token.sub;
            session.user.role = token.role;
            return session;
        },
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },

    session: {
        strategy: "jwt" as const,
    },
    pages: {
        signIn: "front/login",
        signOut: "/logout",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
