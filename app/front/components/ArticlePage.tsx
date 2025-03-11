'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Article, Category, Comments } from "../types/Types";
import Sidebar from "./Sidebar";
import Header from "./Header";


export default function ArticlePage() {
    const { id_article } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [comments, setComments] = useState<Comments | null>(null);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id_article) {
            setError("ID de l'article manquant.");
            setLoading(false);
            return;
        }
        async function fetchArticle() {
            try {
                const response = await fetch(`http://localhost:3000/api/articles/${id_article}`)
                const data = await response.json();
                setArticle(data)
                setComments(data.comments);
                setLoading(false)
            } catch (err) {
                console.error(err)
                setError("Impossible de charger l'article.")
                setLoading(false)
            }
        };
        fetchArticle()
    }, [id_article]);

    if (!id_article) return <div>L'id n'est pas défini</div>
    if (loading) return <div>Chargement de l'article...</div>
    if (!article) return <div>Aucun article trouvé.</div>;
    if (error) return <div>Erreur : {error}</div>;


    return (
        <div className="flex">
            <Header username="Utilisateur" />
            <Sidebar />

            <main className="flex-grow p-8 ml-64 mt-16 bg-gray-100">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
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
                        <Link href={`/users/${article.user?.id_user}`} className="hover:underline">
                            Publié par : {article.user?.username}
                        </Link>
                        <span>{new Date(article.creation_date).toLocaleDateString()}</span>
                    </div>
                </div>
            </main>
        </div>
    );
}