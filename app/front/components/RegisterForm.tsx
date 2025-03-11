
// Fonction Formulaire Inscription 
export default function RegisterForm({ onSubmit, onPasswordChange, passwordStatus }: {
    onSubmit: (username: string, mail: string, password: string) => void,
    onPasswordChange: (password: string) => void,
    passwordStatus: string[]
}) {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const username = (event.target as HTMLFormElement).username.value;
        const mail = (event.target as HTMLFormElement).mail.value;
        const password = (event.target as HTMLFormElement).password.value;

        onSubmit(username, mail, password);
    }


    const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onPasswordChange(event.target.value)
    };

    return (
        <form className="" onSubmit={handleSubmit}>

            <div>
                <input type="text" name="username" placeholder="Nom d'utilisateur" required/>
                <input type="text" name="mail" placeholder="Email" required />
                <input type="password" name="password" placeholder="Mot de Passe" required  onChange={handlePasswordInput}/>
            </div>

            <button type="submit">S'inscrire</button>
        </form>
    )

}
