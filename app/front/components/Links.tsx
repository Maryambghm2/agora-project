// Lien vers inscriptions 

import Link from "next/link";

export function LinkRegister() {
    return (
        <div>
            <p>Pas encore inscrit ? <Link href={'/front/register'}>S'inscrire</Link></p>
        </div>
    );
}

export function LinkLogin() {
    return (
        <div>
            <p>Déja inscrit ? <Link href={'/front/login'}>Se connecter</Link></p>
        </div>
    )
}