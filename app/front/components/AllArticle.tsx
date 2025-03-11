'use client'
import { useState, useEffect } from 'react'
import { Article } from '../types/Types'
import Link from 'next/link';

export function AllArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch('http://localhost:3000/api/articles')
                const data = await response.json()
                setArticles(data)
                setLoading(false)
            } catch (err) {
                setError("Impossible de charger les articles");
            }
        };
        fetchArticles()
    }, []);

    if (loading) return <div>Chargement des articles...</div>

    // const contentLimit = ({article.content}.length)


    return (
        <main className='text-2xl font-bold mb-4'>
            {articles.map(article => (
                <div key={article.id_article} className="border-b py-4">
                    <h4 className='font-semibold'><Link href={`articles/${article.id_article}`}>{article.title}</Link></h4>
                    <p className='text-gray-600'>{article.content.substring(0, 100)}...</p>
                    {/* <div> */}
                    <p className="text-sm  mt-2"><Link href={`users/${article.user?.id_user}`}>{article.user?.username}</Link></p>
                    <p>{new Date(article.creation_date).toLocaleDateString()}</p>
                    {/* </div> */}
                </div>
            ))}
        </main >
    );
}