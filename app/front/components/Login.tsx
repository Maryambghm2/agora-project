'use client'
import { useState } from "react";
import LoginForm from "./LoginForm";
import { LinkRegister } from "./Links";

export default function LoginFunc() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleLogin = async (login: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password })
            });

            if (response.ok) {
                setSuccessMessage("Connexion réussie. Bienvenue !");
                window.location.href = '/front/articles';
            } else {
                const errorText = await response.text();
                setErrorMessage(`Erreur: ${errorText}`);
            }
        } catch (error) {
            setErrorMessage("Erreur lors de la connexion")
            console.error(error)
        }
    }


    return (
        <>
            <h2>Agora Community</h2>
            <div>
                <h3>Se connecter</h3>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <LoginForm onSubmit={handleLogin} />
                <LinkRegister />
            </div>
        </>
    )
}
