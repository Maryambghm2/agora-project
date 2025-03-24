'use client'

import { useState } from "react"
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams, useRouter } from "next/navigation";

export default function AddArticle() {
    const { id_category } = useParams();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            setError("Tous les champs sont requis.");
            return;
        }
        try {
            const response = await fetch(`/api/categories/${id_category}/articles/new`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) throw new Error("Erreur lors de la création de l'article");
            router.push(`/front/categories/${id_category}/articles`)
            setTitle("");
            setContent("");
            setError(null);

        } catch (err) {
            console.error(err);
            setError("Erreur lors de la création de l'article")
        }

    };

    return (
        <div className="flex">
            <Header />
            <Sidebar />
            <main className="flex-grow p-10 ml-64 mt-16 bg-gray-100">
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Ajouter un article</h1>

                    {error && (
                        <p className="text-red-600 bg-red-100 p-2 rounded-md mb-4 text-sm">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Titre"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        />

                        <textarea
                            placeholder="Entrer le contenu"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 h-40 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        />

                        <button
                            type="submit"
                            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition">
                            Créer l'article
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}