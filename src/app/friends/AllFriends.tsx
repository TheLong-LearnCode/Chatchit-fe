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
import { getAllFriend, getProfile, unFriend } from "@/service/api";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

export default function AllFriends() {
  const [allFriend, setAllFriend] = useState([]);

  useEffect(() => {
    const fetchApiAllFriend = async () => {
      const response = await getAllFriend();
      setAllFriend(response);
    };
    fetchApiAllFriend();
  }, []);

  const handleUnFriend = async (id: string) => {
    try {
      const respone = await unFriend(id);
      if (respone) {
        const updatedAllFriends = [...allFriend];
        const index = allFriend.findIndex((req: any) => req._id === id);
        if (index !== -1) {
          updatedAllFriends.splice(index, 1);
        }
        setAllFriend(updatedAllFriends);
      }
    } catch (error) {
      console.log(error);
    }
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
        {allFriend &&
          allFriend.map((friend: any, index) => (
            <li
              className="p-3 bg-zinc-300 text-zinc-950 rounded-lg shadow-sm flex items-center justify-between"
              key={index}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={friend.image || "avatarUnknow.png"}
                    alt={friend.name}
                    className="w-16 h-16"
                  />
                </Avatar>
                <span className="font-medium">{friend.name}</span>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-sky-700 hover:bg-sky-800 duration-300 ease-in-out px-8 text-zinc-100">
                  Nhắn tin
                  <span>
                    <IoChatbubbleEllipsesSharp />
                  </span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="bg-rose-800 hover:bg-rose-900 duration-300 ease-in-out px-8 text-zinc-100">
                      Hủy kết bạn
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-zinc-950  border-2 border-b-accent-foreground ">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bạn chắc chứ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bấm xác nhận để hủy kết bạn với{" "}
                        <strong className="text-zinc-100">{friend.name}</strong>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleUnFriend(friend._id)}
                      >
                        Xác nhận
                      </AlertDialogAction>
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
