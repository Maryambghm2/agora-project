import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#BD3E1E] text-white h-screen fixed top-0 left-0 p-6 z-10">
      <h1 className="text-xl font-bold"><Link href={"/front/articles"}>Agora Community</Link></h1>
      <nav className="mt-6">
        <ul>
          <li className="mb-4">
            <Link href="/front/articles" className="hover:underline text-black">Accueil</Link>
          </li>
          <li className="mb-4">
            <Link href="/front/categories" className="hover:underline text-black">Catégories</Link>
          </li>
          <li>
            <Link href="/front/collection" className="hover:underline text-black">Collection</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
