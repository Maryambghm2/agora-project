"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CustomUser } from "../types/page";

interface EditArticleProps {
    articleId: number;
    currentTitle: string;
    currentContent: string;
    authorId: number;
    categoryId: number
    onCancel: () => void; 
    onSuccess: () => void;
}

export default function EditArticle({ articleId, currentTitle, currentContent, authorId, categoryId, onCancel, onSuccess }: EditArticleProps) {
    const [title, setTitle] = useState(currentTitle);
    const [content, setContent] = useState(currentContent);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const userSession = session?.user as CustomUser;
    const userId = Number(userSession?.id);

    const isAuthor = userId === authorId;

    if (!isAuthor) {
        return null;
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`/api/categories/${categoryId}/articles/${articleId}/edit`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la modification de l'article");
            }

            setSuccess(true);
            onSuccess();
            router.refresh();
        } catch (err) {
            setError("Une erreur est survenue lors de la mise à jour de l'article.");
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-lg font-bold mb-2">Modifier l'article</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Article mis à jour avec succès !</p>}

            <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 rounded h-40"
                    required
                />
                <button type="submit" className="bg-gray-500 text-white py-2 px-4 rounded">
                    Modifier
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-400 text-white py-2 px-4 rounded">
                        Annuler
                    </button>
            </form>
        </div>
    );
}
