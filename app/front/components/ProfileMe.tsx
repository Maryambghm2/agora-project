'use client';

import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";
import { CustomUser, Users, Article } from "../types/page";
import Link from "next/link";
import EditBio from "./EditBio";

export default function MyProfil() {

  const [user, setUser] = useState<Users | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const { data: session } = useSession();

  const userSession = session?.user as CustomUser;
  const userId = Number(userSession?.id);

  async function fetchUserById() {
    try {
      const response = await fetch(`/api/users/me/${userId}`)
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data)
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      setError("Impossible de charger l'utilisateur.")
    }
  }


  async function fetchArticles() {
    try {
      const response = await fetch(`/api/users/${userId}/articles/`);
      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        setArticles(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des articles");
    }
  }

  useEffect(() => {

    fetchUserById();
    fetchArticles();
  }, [userId]);

  return (
    <div className="flex">
      <Header />
      <Sidebar />
      <main className="flex-grow p-8 ml-64 mt-16 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {loading ? (
            <p className="text-center text-gray-600">Chargement en cours...</p>
          )
            : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : user ? (
              <>
                {/* Profil */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{user.username}</h1>
                    <h2 className="text-xl text-gray-600">{user.role.name}</h2>
                    <div className="flex justify-between items-center">
                      {/* Section bio modifiable */}
                      {isEditingBio ? (
                        <EditBio
                          currentBio={user?.bio || ''}
                          userId={userId}
                          onCancel={() => setIsEditingBio(false)}
                          onSuccess={() => {
                            setIsEditingBio(false);
                            fetchUserById();
                          }}
                        />
                      ) : (
                        <div className="mt-4 max-w-60">
                          <p className="text-lg ">Bio:</p>
                          <p>{user?.bio || "Pas de bio disponible"}</p>
                        </div>
                      )}
                      <button
                        onClick={() => setIsEditingBio(!isEditingBio)}
                        className="text-gray-500 hover:text-gray-700"
                      >   {isEditingBio ? "Annuler" : "Modifier la bio"}
                      </button>
                    </div>
                  </div>
                  <img
                    src="/profil.png"
                    width={80}
                    height={80}
                    alt="Avatar"
                    className="rounded-full border border-gray-300"
                  />
                </div>



                {/* Email */}
                <div className="mt-6">
                  <h2 className="font-semibold text-gray-700">Email :</h2>
                  <p className="text-gray-600">{user.mail}</p>
                </div>

                {/* Articles */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold">Articles :</h2>
                  {articles.length > 0 ? (
                    <ul className="mt-4 space-y-4">
                      {articles.map((article) => (
                        <li key={article.id_article} className="border-b py-3">
                          <h3 className="font-semibold text-gray-900">
                            <Link href={`/front/categories/${article.categoryId}/articles/${article.id_article}`} className="hover:underline">
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-gray-500 text-sm">{article.content.slice(0, 100)}...</p>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>{new Date(article.creation_date).toLocaleDateString()}</span>
                            <span>{article.category?.name}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Vous n'avez pas encore écrit d'article.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">Aucun utilisateur trouvé.</p>
            )}
        </div>
      </main >
    </div >
  );
}