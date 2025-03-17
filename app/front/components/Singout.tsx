'use client'

import { signOut, useSession } from "next-auth/react";

export default function SignoutHandle() {
    const { data: session } = useSession();

    const handleLogout = () => {
        signOut({ callbackUrl: '/front/login' }); 
    };

    return (
        <div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Se déconnecter
            </button>
        </div>
    );
}
