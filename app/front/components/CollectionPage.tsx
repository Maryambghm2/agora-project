'use client'
import { useEffect, useState } from "react";
import { Article, CustomUser, Users } from "../types/page";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function CollectionPage() {

    const [user, setUser] = useState<Users | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { data: session } = useSession();

    const userSession = session?.user as CustomUser;
    const userId = userSession?.id;


    async function fetchArticlesCollection() {
        try {
            const response = await fetch(`/api/users/${userId}/collection`)

            const data = await response.json();
            console.log(data)
            const formattedArticles = data.map((item: any) => ({
                id_article: item.article.id_article,
                username: item.user.username,
                title: item.article.title,
                content: item.article.content,
                creation_date: item.article.creation_date,
                category: item.article.category,
            }));
            console.log(formattedArticles);

            setArticles(formattedArticles || []);
            setLoading(false)
        } catch (error) {
            console.error("Erreur lors du chargement des articles");
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchArticlesCollection();
    }, [userId]);

    return (
        <div className="flex">
            <Header username={session?.user?.name} />
            <Sidebar />
            <main className="flex-grow p-8 ml-64 mt-16 bg-gray-100">
                {/* Articles */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Ma collection :</h2>
                    {loading ? (
                        <p>Chargement...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>  // Afficher l'erreur
                    ) : articles.length > 0 ? (
                        <ul className="mt-4">
                            {articles.map((article) => (
                                <li key={article.id_article} className="border-b py-3">
                                    <h3 className="font-semibold">
                                        <Link href={`/front/categories/${article.category?.id_category}/articles/${article.id_article}`}>
                                            {article.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-500 text-sm">{article.content.slice(0, 100)}...</p>
                                    <div className="flex flex-row justify-between">
                                        <Link href={`/users/${userId}`} className="hover:underline">
                                            Publié par : {article.username}
                                        </Link>
                                        <span className="text-gray-400 text-xs">{article.category?.name}</span>
                                        <span>{new Date(article.creation_date).toLocaleDateString()}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Vous n'avez pas encore écrit d'article.</p>
                    )}
                </div>
            </main>
        </div>

    )
}