'use client'
import { useState } from "react";
import { AddCommentProps } from "../types/page";

export default function AddComment({ articleId, categoryId, onCommentAdded }: AddCommentProps) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!comment.trim()) {
            setError("Le commentaire ne peut pas être vide.");
            return;
        }
        try {
            const response = await fetch(`/api/categories/${categoryId}/articles/${articleId}/comments/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: comment }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de l'ajout du commentaire.");
            }
            setComment("");
            onCommentAdded(); 
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="mt-6 p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Ajouter un commentaire</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Écrivez votre commentaire ici..."
                    className="w-full p-2 border rounded-md"
                    rows={4}
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "Envoi..." : "Commenter"}
                </button>
            </form>
        </div>
    );
}