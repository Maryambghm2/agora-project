import Link from "next/link";
import GetNotifications from "./GetNotifications";
import SignoutHandle from "./Singout";
import { useSession } from "next-auth/react";
import { CustomUser } from "../types/page";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
}

export default function Header({ onSearch, searchPlaceholder }: HeaderProps) {
  const { data: session } = useSession();

  const user = session?.user as CustomUser;
  const userId = user?.id;

  return (
    <header className="flex justify-between items-center bg-[#BD3E1E] p-4 text-white w-full fixed top-0 left-0 z-10 shadow-md">
      <div className="flex-grow flex items-center pl-64">
        {onSearch && searchPlaceholder && (
          <SearchBar onSearch={onSearch} placeholder={searchPlaceholder} />
        )}
      </div>

      <div className="flex items-center space-x-6">
        <GetNotifications />
        <div className="flex items-center space-x-2">
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
        </div>
        <SignoutHandle />
      </div>
    </header>
  );
}