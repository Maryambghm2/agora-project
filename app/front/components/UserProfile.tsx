"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Users, Article } from "../types/page";
import Link from "next/link";

export default function UserProfile() {
    const { id_user } = useParams();

    const [user, setUser] = useState<Users | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id_user) return;

        async function fetchUserById() {
            try {
                const response = await fetch(`/api/users/${id_user}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    throw new Error("Impossible de charger l'utilisateur.");
                }
            } catch (err) {
                console.error(err);
                setError("Impossible de charger l'utilisateur.");
            } finally {
                setLoading(false);
            }
        }

        async function fetchArticles() {
            try {
                const response = await fetch(`/api/users/${id_user}/articles/`);
                if (response.ok) {
                    const data = await response.json();
                    setArticles(data);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des articles", error);
            }
        }

        fetchUserById();
        fetchArticles();
    }, [id_user]);

    return (
        <div className="flex">
            <Header />
            <Sidebar />
            <main className="flex-grow p-8 ml-64 mt-16 bg-gray-100">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    {loading ? (
                        <p className="text-center text-gray-600">Chargement en cours...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : user ? (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">{user.username}</h1>
                                    <p className="mt-4 text-gray-600">{user.bio || "Aucune bio renseignée"}</p>
                                </div>
                                <img
                                    src="/profil.png"
                                    width={80}
                                    height={80}
                                    alt="Avatar"
                                    className="rounded-full border border-gray-300"
                                />
                            </div>
                            <div className="mt-6">
                                <h2 className="font-semibold text-gray-700">Email :</h2>
                                <p className="text-gray-600">{user.mail}</p>
                            </div>
                            <div className="mt-8">
                                <h2 className="text-xl font-bold">Articles :</h2>
                                {articles.length > 0 ? (
                                    <ul className="mt-4 space-y-4">
                                        {articles.map((article) => (
                                            <li key={article.id_article} className="border-b py-3">
                                                <h3 className="font-semibold text-gray-900">
                                                    <Link href={`/front/categories/${article.categoryId}/articles/${article.id_article}`} className="hover:underline">
                                                        {article.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-gray-500 text-sm">{article.content.slice(0, 100)}...</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">Vous n'avez pas encore écrit d'article.</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Aucun utilisateur trouvé.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
