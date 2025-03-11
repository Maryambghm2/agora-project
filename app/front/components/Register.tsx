'use client'
import { useState, useEffect } from 'react'
import { User } from '../types/Types';
import RegisterForm from './RegisterForm';
import { LinkLogin } from './Links';



export function VerifRegister() {
    const [users, setUsers] = useState<User[]>([])
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [passwordStatus, setPasswordStatus] = useState<string[]>([
        "Au moins 8 caractères",
        "Une majuscule",
        "Une minuscule",
        "Un chiffre",
        "Un caractère spécial (#?!@$ %^&*-)"
    ]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:3000/api/users/')
                const data = await response.json()
                setUsers(data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers()
    }, [])


    const handlePasswordChange = (password: string) => {
        const newStatus = [
            password.length >= 8 ? "Au moins 8 caractères ✓" : "Au moins 8 caractères",
            /[A-Z]/.test(password) ? "Une majuscule ✓" : "Une majuscule",
            /[a-z]/.test(password) ? "Une minuscule ✓" : "Une minuscule",
            /\d/.test(password) ? "Un chiffre ✓" : "Un chiffre",
            /[#?!@$ %^&*-]/.test(password) ? "Un caractère spécial (#?!@$ %^&*-) ✓" : "Un caractère spécial (#?!@$ %^&*-)"
        ];
        setPasswordStatus(newStatus)
    }

    const handleRegister = async (username: string, mail: string, password: string) => {

        // Regex Email
        const mailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;


        // Vérification champs vides
        if (!username || !mail || !password) {
            setErrorMessage("Tout les champs sont obligatoires.");
            setSuccessMessage(null);

            // Verification longueur champs 
        } else if (username.length < 3 || username.length > 25) {
            setErrorMessage("Le nom d'utilisateur doit contenir entre 3 et 25 caractères.");
            setSuccessMessage(null);
            return;
        } else if (mail.length > 255) {
            setErrorMessage("L'email est trop long (maximum 255 catactères).");
            setSuccessMessage(null);

        } else if (!mailRegex.test(mail)) {
            setErrorMessage("Adresse e-mail invalide.");
            setSuccessMessage(null);
            return;
        }


        const passwordValid = passwordStatus.every(status => status.includes("✓"));
        if (!passwordValid) {
            setErrorMessage("Le mot de passe ne respecte pas les critères.");
            return;
        }

        // Verification champs existants 
        const mailExists = users.some(user => user.mail === mail);
        const usernameExists = users.some(user => user.username.toLowerCase() === username.toLowerCase())

        if (mailExists || usernameExists) {
            setErrorMessage("Cet utilsateur existe déjà.");
            setSuccessMessage(null);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, mail, password }),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de l'inscription");
            }

            setSuccessMessage("Inscription réussie ! Vous serez redirigé dans un instant...")
            setErrorMessage(null);
            setTimeout(() => {
                window.location.href = "login/";
            }, 2000);

        } catch (error) {
            setErrorMessage("Erreur lors de l'inscirption");
            console.error(error);
        }
    };

    return (
        <main>
            <header>
                <h3>S'inscrire</h3>
            </header>
            <div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <RegisterForm onSubmit={handleRegister} onPasswordChange={handlePasswordChange} passwordStatus={passwordStatus} />
                <LinkLogin />
            </div>
        </main>
    )
}
