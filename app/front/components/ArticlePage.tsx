'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Article, Comment, CustomUser } from "../types/page";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AddComment from "./AddComment";
import LikeButton from "./LikeButton";
import { useSession } from "next-auth/react";
import AddCollection from "./AddCollection";
import EditArticle from "./EditArticle";
import { DeleteArticle } from "./DeleteArticleButton";

export default function ArticlePage() {
    const { id_article, id_category } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<number>(0);
    const [usersWhoLiked, setUsersWhoLiked] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();

    const userSession = session?.user as CustomUser;
    const userId = Number(userSession?.id);
    const userRole = Number(userSession?.role)

    // console.log(userSession)
    // console.log(session)

    const fetchArticle = async () => {
        if (!id_article || !id_category) {
            setError("Les paramètres de l'article ou de la catégorie sont manquants.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`/api/categories/${id_category}/articles/${id_article}`);
            const data = await response.json();
            setArticle(data);
            setComments(data.comments || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Impossible de charger l'article.");
            setLoading(false);
        }
    };

    const fetchLikes = async () => {
        try {
            const response = await fetch(`/api/categories/${id_category}/articles/${id_article}/likes`);
            const data = await response.json();
            setLikes(data.totalLikes);
            setUsersWhoLiked(data.usersWhoLiked);
        } catch (error) {
            console.error('Erreur lors de la récupération des likes', error);
        }
    };

    useEffect(() => {
        fetchArticle();
        fetchLikes();
    }, [id_article, id_category]);

    if (loading) return <div>Chargement de l'article...</div>;
    if (error) return <div>Erreur : {error}</div>;
    if (!article) return <div>Aucun article trouvé.</div>;

    return (
        <div className="flex">
            <Header />
            <Sidebar />

            <main className="flex-grow p-8 ml-64 mt-16 bg-gray-100">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">

                    {userId === article.user.userId && (
                        <div className="flex flex-row justify-between">
                            <button onClick={() => setIsEditing(!isEditing)} className="text-gray-500 hover:text-gray-700">
                                ✏️
                            </button>
                            <DeleteArticle
                                articleId={article.id_article}
                                userId={userId}
                                userRole={userRole}
                                categoryId={Number(id_category)}
                            />
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        {isEditing ? (
                            <EditArticle
                                articleId={article.id_article}
                                currentTitle={article.title}
                                currentContent={article.content}
                                authorId={userId}
                                categoryId={Number(id_category)}
                                onCancel={() => setIsEditing(false)} // Ajout d'une fonction d'annulation
                                onSuccess={() => {
                                    setIsEditing(false);
                                    fetchArticle(); // Recharger l'article après modification
                                }}
                            />
                        ) : (
                            <>
                                {/* Titre */}
                                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

                                {/* Image si disponible */}
                                {article.image && (
                                    <img
                                        src={`/pic/${article.image}`}
                                        alt={article.title}
                                        className="w-full h-auto max-h-96 object-cover rounded-lg mb-4"
                                    />
                                )}

                                {/* Contenu */}
                                <p className="text-gray-700 leading-relaxed">{article.content}</p>

                                {/* Auteur & Date */}
                                <div className="mt-6 flex justify-between items-center text-gray-500 text-sm">
                                    <Link href={`/users/${article.user?.userId}`} className="hover:underline">
                                        Publié par : {article.user?.username}
                                    </Link>
                                    <span>{new Date(article.creation_date).toLocaleDateString()}</span>
                                </div>
                            </>
                        )}
                    </div>


                    {/* LikeButton */}
                    <div className="mt-4 flex items-center">
                        <LikeButton articleId={id_article as string} onChangeArticle={fetchLikes} />
                        {usersWhoLiked.length > 0 && (
                            <button
                                className="ml-4 text-gray-500 hover:underline"
                                onClick={() => setModalOpen(true)}
                            >
                                <span className="ml-2">{likes} like(s)</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Modale avec la liste des utilisateurs ayant liké */}
                {modalOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Utilisateurs ayant liké</h2>
                            <ul>
                                {usersWhoLiked.map((user) => (
                                    <li key={user.id_user} className="mb-2">
                                        {user.username}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
                                onClick={() => setModalOpen(false)}
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                )}
                <AddCollection articleId={Number(id_article)} categoryId={Number(id_category)} />

                <div>
                    <AddComment
                        articleId={id_article as string}
                        categoryId={id_category as string}
                        onCommentAdded={() => fetchArticle()}
                    />
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Commentaires</h2>
                        {comments.length > 0 ? (
                            <ul>
                                {comments.map((comment) => (
                                    <li key={comment.id_comment} className="border-b border-gray-300 py-2">
                                        <p className="text-gray-800">{comment.content}</p>
                                        <div className="flex flex-row justify-between mt-2">
                                            <span>Par {comment.user.username}</span>
                                            <span className="text-sm text-gray-500">Posté le {article.modification_date ?
                                                new Date(article.modification_date).toLocaleDateString()
                                                : new Date(article.creation_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucun commentaire pour le moment.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
