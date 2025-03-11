import { FaSearch, FaBell, FaUser } from "react-icons/fa";

interface HeaderProps {
  username: string;
}

export default function Header({ username }: HeaderProps) {
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
        <button className="relative">
          🔔
          {/* <span className="absolute top-0 right-0 bg-red-500 text-xs px-1 rounded-full">3</span> */}
        </button>
        <div className="flex items-center space-x-2">
          <img src="/default-avatar.png" width={32} height={32} alt="Avatar" className="rounded-full" />
          <span>{username}</span>
        </div>
      </div>
    </header>
  );
}
