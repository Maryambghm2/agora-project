'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Article } from "../types/Types";


export default function ArticlePage() {
    const { id_article } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id_article) {
            setError("ID de l'article manquant.");
            setLoading(false);
            return;
        }
        async function fetchArticleById() {
            try {
                const response = await fetch(`http://localhost:3000/api/articles/${id_article}`)
                const data = await response.json();
                setArticle(data)
            } catch (err) {
                console.error(err)
                setError("Impossible de charger l'article.")
            } finally {
                setLoading(false)
            }
        };
        fetchArticleById()
    }, [id_article]);

    if (!id_article) return <div>L'id n'est pas défini</div>
    if (loading) return <div>Chargement des articles...</div>
    if (!article) return <div>Aucun article trouvé.</div>;
    if (error) return <div>Erreur : {error}</div>;


    return (

        <div className=" flex flex-col border-b py-4">
            <h4>{article.title}</h4>
            {article.image && (<img src={`/pic/${article.image}`} alt={article.title} height={200} />
            )}
            <p>{article.content}</p>
            <div>
                <h5><Link href={`/users/${article.user.id_user}`}>{article.user.username}</Link></h5>
                <h5>{new Date(article.creation_date).toLocaleDateString()}</h5>
            </div>
        </div>
    );

}