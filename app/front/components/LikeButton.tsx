'use client'

import { useState } from "react";

export default function LikeButton({ id_article, initialLikes }: { id_article: string; initialLikes: number }) {
    const [likes, setLikes] = useState(initialLikes)
    const [liked, setLiked] = useState(false);


    const handleLike = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/likes', {
                method: 'POST',
            });

            if (!response.ok) {
                setLikes(liked ? likes - 1 : likes + 1);
                setLiked(!liked)
            }
        } catch (error) {
            console.error("Erreur lors du like:", error)
        }
    }


    return (
        <button onClick={handleLike} className={`px-3 py-1 rounded ${liked ? "bg-red-500 text-white" : "bg-gray-200"}`}>
            ❤️ {likes}
        </button>
    );
}