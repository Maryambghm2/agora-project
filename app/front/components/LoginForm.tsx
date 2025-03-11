// Fonction Formulaire Inscription 
export default function RegisterForm({ onSubmit }: {
    onSubmit: (login: string, password: string) => void
}) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const login = (event.target as HTMLFormElement).login.value;
        const password = (event.target as HTMLFormElement).password.value;

        onSubmit(login, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="">
                <input type="text" name="login" placeholder="Nom d'utilisateur/Email " required />
                <input type="text" name="password" placeholder="Mot de Passe" required />
            </div>
            <button type="submit">Se connecter</button>
        </form>
    )

}