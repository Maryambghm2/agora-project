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
        <div className="">
            <p>Déja inscrit ? <Link href={'/'}><span>Se connecter</span></Link></p>
        </div>
    )
}