'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { Article } from "../../../types/page";

export default function CategoryPage() {
    const { id_category } = useParams();
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    async function fetchArticlesByCategory() {
        if (!id_category) return;

        try {
            const response = await fetch(`/api/categories/${id_category}/articles`)

            const data = await response.json();
            if (Array.isArray(data)) {
                setArticles(data);
                // console.log(data)
                setLoading(false);

            } else {
                setArticles([]);
                setLoading(false);

            }
            // console.log(data)
        } catch (err) {
            console.error(err);
            setError("Impossible de charger les articles.")
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetchArticlesByCategory();
    }, [id_category]);

    return (
        <div className="flex">
            <Header onSearch={handleSearch} searchPlaceholder="Rechercher un article dans cette catégorie..." />
            <Sidebar />

            <main className='flex-grow p-8 ml-64 mt-16 bg-gray-100'>
                <div className="mb-4">
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                        <Link href={`/front/categories/${id_category}/articles/new`}>Ajouter un article</Link>
                    </button>
                </div>
                {loading ? (
                    <p>Chargement des articles...</p>
                ) : error ? (
                    <p className='text-red-500'>{error}</p>
                ) : (
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        {filteredArticles.map(article => (
                            <div key={article.id_article} className="border-b py-4">
                                <h4 className='font-semibold'><Link href={`articles/${article.id_article}`}>{article.title}</Link></h4>
                                <p className='text-gray-600'>{article.content.substring(0, 100)}...</p>
                                <div className="mt-6 flex justify-between items-center text-gray-500 text-sm">
                                    <Link href={`/users/${article.author}`} className="hover:underline">
                                        Publié par : {article.user?.username}
                                    </Link>
                                    <span>{new Date(article.creation_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                )}
            </main >
        </div>
    )
}