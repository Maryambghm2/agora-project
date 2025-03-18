'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { CustomUser } from '../types/page';

export default function LikeButton({ articleId, onChangeArticle }: { articleId: string, onChangeArticle: () => void }) {
    const { data: session } = useSession();
    const { id_category } = useParams();
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const userSession = session?.user as CustomUser;
    const userId = userSession?.id;

  
    const toggleLike = async () => {
        if (!userId) return;

        setLoading(true);

        try {
            const response = await fetch(`/api/categories/${id_category}/articles/${articleId}/likes/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setLiked(!liked);
                onChangeArticle(); 
            } else {
                console.error('Erreur lors du like/delike');
            }
        } catch (error) {
            console.error('Erreur de réseau', error);
        } finally {
            setLoading(false);
        }
    };

    // Vérifier l'état du like à chaque rendu
    useEffect(() => {
        const checkIfLiked = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`/api/categories/${id_category}/articles/${articleId}/likes`);
                const data = await response.json();
                const isLiked = data.usersWhoLiked.some((user: { id_user: number }) => user.id_user === Number(userId));
                setLiked(isLiked);
            } catch (error) {
                console.error('Erreur lors de la récupération des likes', error);
            }
        };

        checkIfLiked();
    }, [userId, articleId, id_category]);

    return (
        <div className="mt-4 flex items-center space-x-2">
            <button
                onClick={toggleLike}
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white transition ${liked ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 hover:bg-gray-500'
                    }`}
            >
                {liked ? '❤️' : '🤍'}
            </button>
            <button
                onClick={toggleLike}
                className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition"
            >
                
            </button>
        </div>
    );
};
