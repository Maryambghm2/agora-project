import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#BD3E1E] text-white h-screen fixed top-0 left-0 p-6 z-10">
      <h1 className="text-xl font-bold">Agora Community</h1>
      <nav className="mt-6">
        <ul>
          <li className="mb-4">
            <Link href="/front/articles" className="hover:underline">Accueil</Link>
          </li>
          <li className="mb-4">
            <Link href="/front/categories" className="hover:underline">Catégories</Link>
          </li>
          <li>
            <Link href="/front/collection" className="hover:underline">Collection</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
