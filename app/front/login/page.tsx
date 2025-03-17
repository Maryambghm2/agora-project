'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LinkRegister } from "../components/Links";

export default function LoginPage() {
    const [mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await signIn("credentials", {
            mail,
            password,
            redirect: false,
        });

        console.log(mail);
        console.log(password)
        if (response?.error) {
            setError("Identifiants incorrects !");
            console.log(error);
        } else {
            router.push("/front/categories");
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Connexion</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={mail}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Se connecter
                </button>
                <LinkRegister/>
            </form>
        </div>
    );
}