import { useState } from "react";
import Link from "next/link";
import GetNotifications from "./GetNotifications";
import SignoutHandle from "./Singout";
import { useSession } from "next-auth/react";
import { CustomUser } from "../types/page";
import SearchBar from "./SearchBar";
import { FiMenu, FiX } from "react-icons/fi"; // Icônes pour le menu burger

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export default function Header({ onSearch, searchPlaceholder }: HeaderProps) {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const userId = user?.id;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center bg-[#BD3E1E] p-4 text-white w-full fixed top-0 left-0 z-10 shadow-md">
      {/* Bouton Menu Burger pour Mobile */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Barre de recherche (s'affiche sur desktop uniquement) */}
      <div className="hidden md:flex flex-grow items-center pl-64">
        {onSearch && searchPlaceholder && (
          <SearchBar onSearch={onSearch} placeholder={searchPlaceholder} />
        )}
      </div>

      {/* Menu Mobile (Visible uniquement si menuOpen est true) */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#BD3E1E] flex flex-col items-center p-4 space-y-4 md:hidden transition-all ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <GetNotifications />
        <Link href={`/front/users/me/${userId}`} className="flex items-center">
          <img
            src="/profil.png"
            width={32}
            height={32}
            alt="Avatar"
            className="rounded-full border border-white"
          />
          <span className="ml-2">{session?.user?.name}</span>
        </Link>
        <SignoutHandle />
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex items-center space-x-6">
        <GetNotifications />
        <Link href={`/front/users/me/${userId}`} className="flex items-center">
          <img
            src="/profil.png"
            width={32}
            height={32}
            alt="Avatar"
            className="rounded-full border border-white"
          />
          <span className="ml-2">{session?.user?.name}</span>
        </Link>
        <SignoutHandle />
      </div>
    </header>
  );
}
