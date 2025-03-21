"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkLogin } from "../components/Links";

// REGEX de validation 
const mailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$ %^&*-]).{8,}$/;



export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStatus, setPasswordStatus] = useState([
    "Au moins 8 caractères",
    "Une majuscule",
    "Une minuscule",
    "Un chiffre",
    "Un caractère spécial (#?!@$ %^&*-)"
  ]);

  const router = useRouter();

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    setPasswordStatus([
      password.length >= 8 ? "Au moins 8 caractères ✓" : "Au moins 8 caractères",
      /[A-Z]/.test(password) ? "Une majuscule ✓" : "Une majuscule",
      /[a-z]/.test(password) ? "Une minuscule ✓" : "Une minuscule",
      /\d/.test(password) ? "Un chiffre ✓" : "Un chiffre",
      /[#?!@$ %^&*-]/.test(password) ? "Un caractère spécial ✓" : "Un caractère spécial (#?!@$ %^&*-)"
    ]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !mail || !password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    if (!mailRegex.test(mail)) {
      setError("Adresse e-mail invalide.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Le mot de passe ne respecte pas les critères.");
      return;
    }
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, mail, password }),
    });

    if (!response.ok) {
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
          <ul className="text-sm">
            {passwordStatus.map((status, index) => (
              <li key={index} className={status.includes("✓") ? "text-green-950" : "text-red-950"}>{status}</li>
            ))}
          </ul>
          <button type="submit" className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded">S'inscrire</button>
          <LinkLogin />
        </form>
      </div>
    </>
  );
}
