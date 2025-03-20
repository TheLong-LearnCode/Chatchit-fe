"use client";
import ButtonLogout from "@/components/layout/Header/ButtonLogout";
import { ModeToggle } from "@/components/toggle-theme";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110">
        Real Chat
      </div>

      <div className="flex justify-center items-center space-x-2">
        {session && session.user && (
          <div className="text-lg font-semibold text-neutral-500 dark:text-neutral-400">
            {session.user.name}
          </div>
        )}
        <ModeToggle />
        <ButtonLogout />
      </div>
    </header>
  );
}
