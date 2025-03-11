import { useRouter } from "next/router";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
        >
            Se Déconnecter
        </button>
    );
}
