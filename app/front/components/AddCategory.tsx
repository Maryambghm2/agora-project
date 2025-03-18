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

    return  (
        <div className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white w-64">
            <h2 className="text-md font-semibold mb-2 text-gray-700">Nouvelle catégorie</h2>
            {message && <p className="text-xs text-gray-600 mb-1">{message}</p>}
            <form onSubmit={handleAddCategory} className="flex flex-col space-y-2">
                <input
                    type="text"
                    placeholder="Nom"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="p-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
                />
                <button
                    type="submit"
                    className="bg-gray-600 text-white text-sm px-2 py-1.5 rounded hover:bg-gray-700 transition">
                    Ajouter
                </button>
            </form>
        </div>
    );
}