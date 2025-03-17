'use client'

import { useEffect, useState } from "react"

import Link from "next/link";
import { Category } from "../types/page";
import AddCategory from "../components/AddCategory";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSession } from "next-auth/react";

export default function CategoriesList() {
    const { data: session } = useSession()
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories')
                const data = await response.json();
                // console.log(data);
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
            {/* <Link href={'/front/categories/new'}>Pour ajouter une nouvelle catégorie(Administrateur)</Link> */}

            <Header />
            <Sidebar />
            <main className='flex-grow p-8 ml-64 mt-16 bg-gray-100'>
                {loading ? (
                    <p>Chargement des catégories...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <AddCategory />

                        <h1 className="text-2xl font-bold mb-4">Liste des catégories :</h1>
                        {categories.map(categorie => (
                            <div key={categorie.id_category} className="flex flex-col border rounded-xl py-1.5">
                                <h4 className=""><Link href={`/front/categories/${categorie.id_category}/articles`}>{categorie.name}</Link></h4>

                                <div className="">
                                    <h6 className="">{categorie.articles?.length}</h6>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}