'use client';

import { useParams } from "next/navigation";
import { Article, User } from "../types/Types";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function UserPage() {
  const { id_user } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserById() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id_user}`)
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        setError("Impossible de charger l'utilisateur.")
      }
    }


    async function fetchArticles() {
      try {
        const response = await fetch(`http://localhost:3000/api/articles/user/${id_user}`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des articles");
      }
    }


    fetchUserById();
    fetchArticles();
  }, [id_user]);

  if (loading) return <div>Chargement de l'utilisateur...</div>
  if (!user) return <div>Aucun utilisateur trouvé.</div>
  if (error) return <div>Erreur : {error}</div>;



  return (
    <div className="flex">
      <Header username={user.username} />
      <Sidebar />
      <main className="flex-grow p-8 ml-64 mt-16 bg-gray-100">
        <div className="bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            {/* Profil */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <div className="p-4">
                  <p className="text-gray-600">{user.bio || "Aucune bio renseignée"}</p>
                </div>
              </div>
              <img
                src={user.profile_picture || "/profil.png"}
                width={80}
                height={80}
                alt="Avatar"
                className="rounded-full border"
              />
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-4">
              <h2 className="font-semibold">Mes réseaux :</h2>
              <div className="flex gap-3 mt-2">
                {user.social_networks.map((network) => (
                  <a key={network.name} href={network.link || "#"} target="_blank" rel="noopener noreferrer">
                    <img src={`/${network.name}.png`} alt={network.name} width={30} height={30} />
                  </a>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="mt-4">
              <h2 className="font-semibold">Email :</h2>
              <p className="text-gray-700">{user.mail}</p>
            </div>


{/* {Categories } */}

            {/* Articles */}
            <div className="mt-6">
              <h2 className="text-xl font-bold">Mes articles :</h2>
              {articles.length > 0 ? (
                <ul className="mt-4">
                  {articles.map((article) => (
                    <li key={article.id_article} className="border-b py-3">
                      <h3 className="font-semibold">{article.title || "Sans titre"}</h3>
                      <p className="text-gray-500 text-sm">{article.content.slice(0, 100)}...</p>
                      <span className="text-gray-400 text-xs">{new Date(article.creation_date).toLocaleDateString()}</span>
                      {/* <span>{article.categories?.category?.name}</span> */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Cet utilisateur n'a pas encore écrit d'article.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}