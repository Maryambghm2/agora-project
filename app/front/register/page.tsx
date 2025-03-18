"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkLogin } from "../components/Links";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, mail, password }),
    });

    if (!res.ok) {
      setError("Erreur lors de l'inscription !");
      return;
    }

    router.push("/front/login");
  };

  return (
    <>
      <aside>
        <h1 className="text-xl font-bold p-3">Agora Community</h1>
      </aside>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Inscription</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 rounded" />
          <input type="email" placeholder="Email" value={mail} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" />
          <button type="submit" className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded">S'inscrire</button>
          <LinkLogin />
        </form>
      </div>
    </>
  );
}
