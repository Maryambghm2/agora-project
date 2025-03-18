'use client'

import { useEffect, useState } from "react"

import Link from "next/link";
import { Category } from "../types/page";
import AddCategory from "../components/AddCategory";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSession } from "next-auth/react";

export default function CategoriesPage() {
    const { data: session } = useSession()
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userRole = (session?.user as { role?: number })?.role; // 1 = admin, 0 = utilisateur


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories')
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (err) {
                console.error(err)
                setError("Impossible de charger les catégories ");
            }
        };
        fetchCategories();
    }, []);


    return (
        <div className="flex">
            <Header />
            <Sidebar />
            <main className='flex-grow p-8 ml-64 mt-16 bg-gray-100'>
                {loading ? (
                    <p>Chargement des catégories...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Catégories :</h1>
                            {userRole === 1 && <AddCategory />}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map(categorie => (
                                <Link
                                    key={categorie.id_category}
                                    href={`/front/categories/${categorie.id_category}/articles`}
                                    className="flex justify-between items-center p-3 border rounded-lg shadow-sm bg-gray-100 hover:bg-gray-200 transition"
                                >
                                    <span className="font-semibold text-gray-700">{categorie.name}</span>
                                    <span className="text-xs bg-gray-300 px-2 py-1 rounded-full text-gray-700">
                                        {categorie.articles?.length} Articles
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}