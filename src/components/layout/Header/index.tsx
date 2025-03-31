"use client";
import Notification from "@/components/layout/Header/Notification";
import UserDropdown from "@/components/layout/Header/UserDropdown";
import { ModeToggle } from "@/components/toggle-theme";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GradientText from "./logo";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#121216] shadow-md px-6 py-4 flex items-center justify-between">
      <div onClick={() => router.push("/")}>
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class cursor-pointer text-2xl font-extrabold bg-clip-text transition-transform duration-300 hover:scale-103 "
        >
          Real Chat
        </GradientText>
      </div>

      <div className="flex justify-center items-center space-x-2">
        <ModeToggle />
        <Notification />
        {session && session.user && <UserDropdown user={session.user} />}
      </div>
    </header>
  );
}
