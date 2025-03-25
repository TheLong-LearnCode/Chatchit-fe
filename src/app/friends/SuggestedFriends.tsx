/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSuggestFriend } from "@/service/api";
import { IUser } from "@/types/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";

export default function SuggestedFriends() {
  const {data: session} = useSession();
  const [suggestFriends, setSuggestFriends] = useState<IUser[]>([]);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const fetchSuggestedFriends = async () => {
      const response = await getSuggestFriend();
      setSuggestFriends(response);
    };

    fetchSuggestedFriends();
  }, []);

  const handleAddFriend = (receiverID: string) => {
    socketRef.current.emit(
        "requestAddFriend",
        JSON.stringify({
          senderID: session?.user._id,
          receiverID: receiverID,
        })
      );
  };

  return (
    <div>
      <div className="mb-4 w-full flex items-center justify-center">
        <div className="relative w-80 mr-2">
          <Input placeholder="Search friend..." className="w-full pr-10" />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <ul className="space-y-2">
        {suggestFriends &&
          suggestFriends.map((sgf, index) => (
            <li
              key={index}
              className="p-3 bg-zinc-200 text-zinc-950 rounded-lg shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={sgf.image || "/avatar.jpg"}
                    alt={sgf.name || "Unknown"}
                    className="w-16 h-16"
                  />
                </Avatar>
                <span className="font-medium">{sgf.name || "Unknown"}</span>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => handleAddFriend(sgf._id)} className="bg-sky-600 hover:bg-sky-700 duration-300 ease-in-out px-8 text-zinc-100">
                 Kết bạn
                  <span>
                    <IoIosPersonAdd />
                  </span>
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="bg-rose-600 hover:bg-rose-700 duration-300 ease-in-out px-8 text-zinc-100">
                      Chặn
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-zinc-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bạn chắc chứ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bấm xác nhận để chặn
                        <strong className="text-zinc-100">{sgf.name}</strong>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction>Xác nhận</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
