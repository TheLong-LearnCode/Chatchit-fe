"use client";
import UserDropdown from "@/components/layout/Header/UserDropdown";
import { ModeToggle } from "@/components/toggle-theme";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#121216] shadow-md px-6 py-4 flex items-center justify-between">
      <div onClick={() => router.push('/')} className="cursor-pointer text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110">
        Real Chat
      </div>

      <div className="flex justify-center items-center space-x-2">
        <ModeToggle />
        {session && session.user && <UserDropdown user={session.user}/>}
      </div>
    </header>
  );
}
