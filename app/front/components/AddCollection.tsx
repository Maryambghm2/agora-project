'use client'
import { useEffect, useState } from 'react';
import { CustomUser } from '../types/page';
import { useSession } from 'next-auth/react';

export default function AddCollection({ articleId, categoryId }: { articleId: number, categoryId: number,}) {
    const [isInCollection, setIsInCollection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { data: session } = useSession();
    const userSession = session?.user as CustomUser;
    const userId = userSession?.id;

    const handleClick = async () => {
        if (!userId) return;

        setLoading(true);
        setError(null);

        try {

            const response = await fetch(`/api/categories/${categoryId}/articles/${articleId}/collection/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                setIsInCollection(!isInCollection);
                // onChangeArticle();
            } else {
                console.error('Erreur lors de l\'ajout/suppression de la collection');
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    const checkIfInCollection = async () => {
        if (!userId) return;

        try {
            const response = await fetch(`/api/users/me/${userId}/collection/${articleId}`);
            const data = await response.json();

            // Vérifie si l'article est bien dans la collection
            if (Array.isArray(setIsInCollection(data))) {
                data.some((collection: any) => collection.id_article === articleId);
            } else {
                setIsInCollection(data);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de la collection", error);
        } 
    };

  
        checkIfInCollection();

    }, [userId, articleId]);



    return (
        <div className="mt-4 flex items-center space-x-2">
            <button
                onClick={handleClick}
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white transition ${isInCollection ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
                    }`}
            >
                {loading ? 'Chargement...' : isInCollection ? '❌ Retirer de la collection' : '⭐ Ajouter à la collection'}
            </button>
        </div>
    );
};
