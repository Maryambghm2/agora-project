'use client'
import { useEffect, useState } from 'react';
import { AddCollectionProps } from '../types/page';

export default function AddCollection({ articleId, isInCollection, categoryId, userId }: AddCollectionProps) {
    const [isInUserCollection, setIsInUserCollection] = useState(isInCollection);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        setIsInUserCollection(isInCollection);
    }, [isInCollection]);

    const handleClick = async () => {
        setLoading(true);
        setError(null);
        try {

            const response = await fetch(`/api/categories/${categoryId}/articles/${articleId}/collection/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_article: articleId, id_user: userId }),
            });

            const data = await response.json();


            setIsInUserCollection(!isInUserCollection);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`btn ${isInUserCollection ? "btn-danger" : "btn-primary"}`}
        >
            {loading ? "Chargement..." : isInUserCollection ? "Supprimer de la collection" : "Ajouter à la collection"}
        </button>
    );
};
