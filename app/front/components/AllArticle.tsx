'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Header from './Header';
import Sidebar from './Sidebar';
import { Article } from '../types/page';

export function AllArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchArticles() {
        try {
            const response = await fetch('/api/articles')
            const data = await response.json();
            if (data.length > 0) {
                const formattedArticles = data.map((article: any) => ({
                    id_article: article.id_article,
                    author: article.user.username,
                    author_id: article.user.id_user,
                    title: article.title,
                    content: article.content,
                    creation_date: article.creation_date,
                    category: article.category,
                }));

                setArticles(formattedArticles || []);
                setLoading(false)
            } else {
                setError("Pas encore d'articles disponible pour vous.")
            }
        } catch (err) {
            console.error(err);
            setError("Impossible de charger les articles");
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };


    useEffect(() => {
        fetchArticles();
    }, []);


    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex">
            <Header onSearch={handleSearch} searchPlaceholder="Rechercher un article" />
            <Sidebar />
            <main className='flex-grow p-8 ml-64 mt-16 bg-gray-100'>
                {loading ? (
                    <p>Chargement des articles...</p>
                ) : error ? (
                    <p className='text-red-500'>{error}</p>
                ) : (
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        {filteredArticles.map(article => (
                            <div key={article.id_article} className="border-b py-4">
                                <h3 className="font-semibold">
                                    <Link href={`/front/categories/${article.category?.id_category}/articles/${article.id_article}`}>
                                        {article.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-500 text-sm">{article.content.slice(0, 100)}...</p>
                                <div className="flex flex-row justify-between align-middle">
                                    <Link href={`/front/users/${article.author_id}`} className="hover:underline">
                                        Publié par : {article.author}
                                    </Link>
                                    <span>{new Date(article.creation_date).toLocaleDateString()}</span>
                                    <Link href={`/front/categories/${article.category?.id_category}/articles`}><span className="text-gray-400 text-xs">{article.category?.name}</span></Link>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                )}
            </main >
        </div>
    );
}