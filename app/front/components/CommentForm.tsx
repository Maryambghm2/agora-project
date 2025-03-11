'use client'

import { useParams } from "next/navigation";
import { useState } from "react";

export function CommentForm({ id_article, setComments }: { id_article: string, setComments: any }) {
    const [newComment, setNewComment] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`http://localhost:3000/api/comments/${id_article}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newComment }),
            });

            if (!response.ok) {
                const addedComment = await response.json();
                setComments((prevComments: any) => [newComment, ...prevComments]);
                setComments("");
            }

        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire :", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
            <textarea value={newComment} onChange={(e) => (e.target.value) } placeholder="Ecrire un commentaire..." className="border p-2 rounded w-full"/>
       <button type="submit" className="bg-grey-500 text-white px-4 py-2 rounded-md">Valider</button>
        </form>
    )
}