'use client'
import { useRouter } from "next/navigation";

interface DeleteArticleButtonProps {
    articleId: number;
    userId: number;
    userRole: number;
    categoryId: number;
}

export function DeleteArticle({ articleId, userId, userRole, categoryId }: DeleteArticleButtonProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return;

        try {
            const response = await fetch(`/api/categories/${categoryId}/articles/${articleId}/delete`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression de l'article");
            }

            alert("Article supprimé avec succès !");
            router.push("/categories");
        } catch (error) {
            console.error("Erreur:", error);
            alert("Impossible de supprimer l'article.");
        }

        if (userId !== articleId && userRole !== 1) return null;
    };

    return (
        <button onClick={handleDelete} className="cursor-pointer">
            🗑️
        </button>
    );
};