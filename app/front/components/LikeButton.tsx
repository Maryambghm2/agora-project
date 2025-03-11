'use client'

import { useState } from "react";

export default function LikeButton({ id_article, id_user }: { id_article: string; id_user: string }) {
    const [liked, setLiked] = useState(false);


    const handleLike = async () => {
        const response = await fetch('http://localhost:3000/api/likes', {
            method: 'POST',
            body: JSON.stringify({ id_article, id_user }),
        });

        if (!response.ok) { setLiked(!liked) }
    }


    return (
        <button onClick={handleLike} className={`px-3 py-1 rounded ${liked ? "bg-red-500 text-white" : "bg-gray-200"}`}>
            {liked ? "❤️ Unlike" : "🤍 Like"}
        </button>
    )
}