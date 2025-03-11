import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany();
        // console.log("Utilisateurs : ", users);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    } finally {
        await prisma.$disconnect();
    }
} 

main();

export default prisma;