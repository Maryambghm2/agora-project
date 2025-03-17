import Link from "next/link";
import { ConnectedProps, CustomUser } from "../types/page";
import GetNotifications from "./GetNotifications";
import SignoutHandle from "./Singout";
import { useSession } from "next-auth/react";


export default function Header({ username, }: ConnectedProps) {
  const { data: session } = useSession();

  const user = session?.user as CustomUser;
  const userId = user?.id;

  return (
    <header className="flex justify-between items-center bg-[#BD3E1E] p-4 text-white w-full fixed top-0 left-0 z-10">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher..."
          className="px-3 py-1 rounded-lg text-black"
        />
      </div>
      <div className="flex items-center space-x-4">
        <GetNotifications />

        <div className="flex items-center flex-col space-x-2">
          <Link href={`/front/users/${userId}`}>
            <img src="/profil.png" width={24} height={24} alt="Avatar" className="rounded-full" />
          </Link>
          <span>{username}</span>
        </div>
        <SignoutHandle />
      </div>
    </header>
  );
}
