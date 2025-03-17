'use client'

import { useState } from "react"
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams, useRouter } from "next/navigation";



export default function ArticleForm() {
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
            <main className="flex flex-col flex-grow p-16 ml-64 mt-16 bg-gray-100 rounded-lg shadow-md">
                <h1>Ajouter un article</h1>
                <form onSubmit={handleSubmit} className="justify-center flex-col align-middle">
                    <div className="flex flex-col gap-5">
                        {error && <p>{error}</p>}
                        <input className="bg-gray-100 p-1.5" type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <textarea className="bg-gray-100 p-1.5" placeholder="Entrer le contenu" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                        <button type="submit" className=" mt-4 border rounded-2xl p-1 bg-gray-100">Créer l'article</button>
                    </div>
                </form>
            </main>
        </div>
    )

}