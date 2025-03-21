
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

// Configuration de Swagger
fastify.register(swagger, {
  swagger: {
    info: {
      title: "API Blog",
      description: "Documentation de l'API pour le blog",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

fastify.register(swaggerUI, {
  routePrefix: "/docs",
  exposeRoute: true,
});

// Route de test
fastify.get("/", async (request, reply) => {
  return { message: "API fonctionne 🚀" };
});

// Route pour récupérer les utilisateurs avec Swagger
fastify.get("/users", {
  schema: {
    description: "Récupère la liste des utilisateurs",
    tags: ["User"],
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id_user: { type: "number" },
            username: { type: "string" },
            mail: { type: "string" },
          },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const users = await prisma.user.findMany();
    return users;
  },
});

// Démarrer le serveur
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("🚀 Serveur en écoute sur http://localhost:3000");
    console.log("📑 Documentation disponible sur http://localhost:3000/docs");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
