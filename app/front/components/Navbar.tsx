"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/articles">Articles</Link>
      {session ? (
        <>
          <span>Bonjour, {session.user?.name}</span>
          <button onClick={() => signOut()}>Déconnexion</button>
        </>
      ) : (
        <Link href="/login">Connexion</Link>
      )}
    </nav>
  );
}
