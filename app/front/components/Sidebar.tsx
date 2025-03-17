import { useSession } from "next-auth/react";
import Link from "next/link";
import { CustomUser } from "../types/page";

export default function Sidebar() {

  const { data: session } = useSession();

  const userSession = session?.user as CustomUser;
  const userId = userSession?.id;
  return (
    <aside className="w-64 bg-[#BD3E1E] text-white h-screen fixed top-0 left-0 p-6 z-10">
      <h1 className="text-xl font-bold"><Link href={"/front/articles"}>Agora Community</Link></h1>
      <nav className="mt-6">
        <ul>
          <li className="mb-4">
            <Link href="/front/categories" className="hover:underline text-black font-bold">Catégories</Link>
          </li>
          <li>
            <Link href={`/front/users/${userId}/collection`} className="hover:underline text-black font-bold">Collection</Link>
          </li>
        </ul>
      </nav>
    </aside >
  );
}
