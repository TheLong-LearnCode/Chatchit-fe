"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/user";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

export default function UserDropdown({ user }: { user: IUser }) {
  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={user.image}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-36 translate-x-[-40px]" side="bottom">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => router.push("/profile")}>
              View Profile
              <DropdownMenuShortcut>
                <FaUserAlt />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() => router.push("/friends")}>
              Friends
              <DropdownMenuShortcut>
                <FaUserFriends />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() => signOut()}>
              Log Out
              <DropdownMenuShortcut>
                <IoLogOut />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
