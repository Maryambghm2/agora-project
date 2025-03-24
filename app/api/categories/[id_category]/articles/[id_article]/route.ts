import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";

/**
 * @swagger
 * /api/categories/{id_category}/articles/{id_article}:
 *   get:
 *     summary: Récupère un article spécifique d'une catégorie par son ID
 *     description: Cette route permet de récupérer un article spécifique, en fonction de son ID et de sa catégorie. L'article retourné inclut des informations telles que l'auteur, le nombre de likes, les utilisateurs ayant aimé l'article, et les commentaires associés. 
 *     parameters:
 *       - name: id_category
 *         in: path
 *         required: true
 *         description: ID de la catégorie de l'article
 *         schema:
 *           type: integer
 *       - name: id_article
 *         in: path
 *         required: true
 *         description: ID de l'article à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article trouvé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_article:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Mon premier article"
 *                 content:
 *                   type: string
 *                   example: "Ceci est le contenu de l'article."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_user:
 *                       type: integer
 *                       example: 2
 *                     username:
 *                       type: string
 *                       example: "Auteur123"
 *                     likes:
 *                       type: integer
 *                       example: 5
 *                 _count:
 *                   type: object
 *                   properties:
 *                     likes:
 *                       type: integer
 *                       example: 10
 *                 likes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           id_user:
 *                             type: integer
 *                             example: 3
 *                           username:
 *                             type: string
 *                             example: "UserLike"
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_comment:
 *                         type: integer
 *                         example: 45
 *                       creation_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-24T12:30:00Z"
 *                       content:
 *                         type: string
 *                         example: "Très bon article !"
 *                       user:
 *                         type: object
 *                         properties:
 *                           id_user:
 *                             type: integer
 *                             example: 4
 *                           username:
 *                             type: string
 *                             example: "Commentateur"
 *       400:
 *         description: ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "L'id n'est pas valide."
 *       404:
 *         description: Article non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Article introuvable"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de l'affichage de l'article"
 */


export async function GET(req: NextRequest, { params }: { params: Promise<{ id_article: string }> }) {
    try {

        const { id_article } = await params;
        const articleId = Number(id_article);

        // console.log(articleId)
        if (isNaN(articleId)) {
            return NextResponse.json({ error: "L'id n'est pas valide." }, { status: 400 })
        }

        const article = await db.article.findUnique({
            where: { id_article: articleId },
            include: {
                user: {
                    select: {
                        id_user: true,
                        username: true,
                        likes: true
                    },
                },
                _count: {
                    select: {
                        likes: true
                    }
                },
                likes: {
                    include: {
                        user: {
                            select: {
                                id_user: true, username: true
                            }
                        }
                    }

                },
                comments: {
                    select: {
                        id_comment: true,
                        creation_date: true,
                        content: true,
                        user: {
                            select: {
                                id_user: true,
                                username: true,
                            }
                        }
                    },
                    orderBy: { creation_date: "desc" }
                },
            },
        });

        if (!article) {
            return NextResponse.json({ error: "Article introuvable" }, { status: 404 })
        }
        // console.log(article)
        return NextResponse.json(article)
    } catch (error) {
        console.error("Erreur lors de l'affichage de l'article:", error)
        return NextResponse.json({ error: "Erreur lors de l'affichage de l'article" }, { status: 500 })
    }
}