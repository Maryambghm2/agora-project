import swaggerJSDoc from "swagger-jsdoc";


const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Agora",
      version: "1.0.0",
      description: "Documentation auto-générée de l'API avec Swagger et Next.js",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/app/api/**/*.ts"], // Chemin vers les fichiers API Next.js
};

export const swaggerSpec = swaggerJSDoc(options);
