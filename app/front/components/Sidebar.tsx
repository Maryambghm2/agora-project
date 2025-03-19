import { useSession } from "next-auth/react";
import Link from "next/link";
import { CustomUser } from "../types/page";

export default function Sidebar() {

  const { data: session } = useSession();

  const userSession = session?.user as CustomUser;
  const userId = userSession?.id;
  return (
    <aside className="w-64 bg-[#BD3E1E] text-white h-screen fixed top-0 left-0 p-6 z-10">
          <h1 className="text-2xl font-bold mb-6">
        <Link className="hover:text-gray-200" href={"/front/articles"}>Agora Community</Link></h1>
      <nav className="mt-6">
        <ul className="space-y-4">
          <li className="mb-4">
            <Link href="/front/articles" className="hover:text-gray-300">Accueil</Link>
          </li>
          <li className="mb-4">
            <Link href="/front/categories" className="hover:text-gray-300">Catégories</Link>
          </li>
          <li>
            <Link href={`/front/users/me/${userId}/collection`} className="hover:text-gray-300">Collection</Link>
          </li>
        </ul>
      </nav>
    </aside >
  );
}
