'use client'
import { useEffect, useState } from "react";
import { Article, CustomUser, Users } from "../types/page";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function CollectionPage() {
    const [users, setUsers] = useState<Users[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { data: session } = useSession();

    const userSession = session?.user as CustomUser;
    const userId = userSession?.id;
    // console.log(userSession)

    async function fetchArticlesCollection() {
        try {
            const response = await fetch(`/api/users/${userId}/collection`)

            const data = await response.json();
            // console.log(data)
            const formattedArticles = data.map((item: any) => ({
                id_article: item.article.id_article,
                username: item.user.username,
                author: item.article.user.username,
                title: item.article.title,
                content: item.article.content,
                creation_date: item.article.creation_date,
                category: item.article.category,
            }));
            // console.log(formattedArticles);

            setArticles(formattedArticles || []);
            setLoading(false)
        } catch (error) {
            console.error("Erreur lors du chargement des articles");
            setLoading(false)
        }
    }

    // const handleDelete = async (id_article: string) => {
    //     if (!id_article) return;
    //     if (!confirm("Voulez-vous vraiment supprimer cet article de la collection ?")) return;

    //     try {
    //         const response = await fetch(`/api/users/${userId}/collection`, {
    //             method: 'DELETE',
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ id_article }),
    //         });

    //         if (!response.ok) throw new Error("Erreur lors de la suppression");

    //         setArticles(prevArticles => prevArticles.filter(article => article.id_article !== Number(id_article)))
    //         alert("Article supprimé avec succès !");
    //     } catch (err) {
    //         console.error("Erreur suppression:", err)
    //         setError("Impossible de supprimer l'article de la collection")
    //     }
    // }

    useEffect(() => {
        fetchArticlesCollection();
    }, [userId]);

    return (
        <div className="flex">
            <Header />
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
                                    <div className="flex flex-row justify-between align-middle">
                                        <Link href={`/front/users/${article.author}`} className="hover:underline">
                                            Publié par : {article.author}
                                        </Link>
                                        <span>{new Date(article.creation_date).toLocaleDateString()}</span>
                                        <Link href={`/front/categories/${article.category?.id_category}/articles`}><span className="text-gray-400 text-xs">{article.category?.name}</span></Link>
                                    </div>
                                    {/* <button
                                        onClick={() => handleDelete(article.id_article.toString())}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        🗑️
                                    </button> */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Pas d'article dans la collection .</p>
                    )}
                </div>
            </main>
        </div>

    )
}