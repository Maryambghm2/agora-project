"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddCategory() {
    const { data: session } = useSession();
    const [categoryName, setCategoryName] = useState("");
    const [message, setMessage] = useState("");

    const userRole = (session?.user as { role?: number })?.role;

    
    // console.log(userRole)
    if (!userRole || userRole !== 1) {
        return <p>Vous n'avez pas l'autorisation d'ajouter une catégorie.</p>;
    }

    // Fonction pour ajouter une catégorie
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            setMessage("Le nom de la catégorie est requis.");
            return;
        }

        try {
            const res = await fetch("/api/categories/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: categoryName }),
            });

            if (res.ok) {
                setMessage("Catégorie ajoutée avec succès !");
                setCategoryName("");
            } else {
                setMessage("Erreur lors de l'ajout de la catégorie.");
            }
        } catch (error) {
            setMessage("Erreur réseau.");
        }
    };

    return (
        <div>
            <h2>Ajouter une catégorie</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddCategory}>
                <input
                    type="text"
                    placeholder="Nom de la catégorie"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}
