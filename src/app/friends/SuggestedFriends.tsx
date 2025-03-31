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
import {
  getAllRequest,
  getAllRequestMeSend,
  getSuggestFriend,
  undoFriend,
} from "@/service/api";
import { IUser } from "@/types/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { io } from "socket.io-client";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuggestedFriends() {
  const { data: session } = useSession();
  const [suggestFriends, setSuggestFriends] = useState<any[]>([]);
  const socketRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session || !session.backendTokens?.accessToken) return;
    //Lẩy token
    const token = session?.backendTokens?.accessToken;
    socketRef.current = io("http://localhost:3002", {
      extraHeaders: { token },
    });
    const fetchSuggestedFriends = async () => {
      const response = await getSuggestFriend();
      const allRequest = await getAllRequestMeSend(session.user._id);
      const result = response.map((user: any) => {
        return {
          ...user,
          isRequested: allRequest.some(
            (req: any) => req.request.receiver_id === user._id
          ),
        };
      });
      setIsLoading(false);
      setSuggestFriends(result);
    };
    // const fetchSuggestedFriends = async () => {
    //   const [response, allRequest] = await Promise.all([
    //     getSuggestFriend(),
    //     getAllRequestMeSend(session.user._id),
    //   ]);
    //   const requestedIdsSet = new Set(
    //     allRequest.map((req: any) => req.request.receiver_id)
    //   );
    //   const result = response.map((user: any) => ({
    //     ...user,
    //     isRequested: requestedIdsSet.has(user._id),
    //   }));
    //   setSuggestFriends(result);
    // };
    fetchSuggestedFriends();
  }, []);

  const handleAddFriend = (receiverID: string) => {
    console.log(receiverID);
    socketRef.current.emit(
      "requestAddFriend",
      JSON.stringify({
        senderID: session?.user._id,
        receiverID: receiverID,
      })
    );
    const updatedSuggestFriends = [...suggestFriends];
    const index = updatedSuggestFriends.findIndex(
      (suggest) => suggest._id === receiverID
    );
    if (index !== -1) {
      updatedSuggestFriends[index].isRequested = true;
      setSuggestFriends(updatedSuggestFriends);
    }
  };

  const handleUndoFriend = async (receiverID: string) => {
    const response = await undoFriend(receiverID);
    const updatedSuggestFriends = [...suggestFriends];
    const index = updatedSuggestFriends.findIndex(
      (suggest) => suggest._id === receiverID
    );
    if (index !== -1) {
      updatedSuggestFriends[index].isRequested = false;
      setSuggestFriends(updatedSuggestFriends);
    }
  };

  return (
    <>
      <div>
        <div className="mb-4 w-full flex items-center justify-center">
          {isLoading ? (
            <>
              <div className="relative w-80 mr-2">
                <Skeleton className="w-full h-10 rounded-md " />
                <Skeleton>
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

                </Skeleton>
              </div>
            </>
          ) : (
            <div className="relative w-80 mr-2">
              <Input placeholder="Search friend..." className="w-full pr-10" />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          )}
        </div>

        <ul className="space-y-2">
          {isLoading ? (
            <>
           
              <div className="pr-10 pl-3 py-3  rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-145 h-4 rounded-md" />
                    <Skeleton className="w-145 h-4 rounded-md" />
                  </div>
                </div>
                <div className="">
                  <Skeleton className="w-30 h-10 rounded-md" />
                </div>
              </div>
              <div className="pr-10 pl-3 py-3  rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3 ">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-145 h-4 rounded-md" />
                    <Skeleton className="w-145 h-4 rounded-md" />
                  </div>
                </div>
                <div className="">
                  <Skeleton className="w-30 h-10 rounded-md" />
                </div>
              </div>
              <div className="pr-10 pl-3 py-3  rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-145 h-4 rounded-md" />
                    <Skeleton className="w-145 h-4 rounded-md" />
                  </div>
                </div>
                <div className="">
                  <Skeleton className="w-30 h-10 rounded-md" />
                </div>
              </div>
              <div className="pr-10 pl-3 py-3  rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-3 ">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-145 h-4 rounded-md" />
                    <Skeleton className="w-145 h-4 rounded-md" />
                  </div>
                </div>
                <div className="">
                  <Skeleton className="w-30 h-10 rounded-md" />
                </div>
              </div>
              
            </>
          ) : (
            suggestFriends &&
            suggestFriends?.map((sgf, index) => (
              <li
                key={index}
                className="p-3 bg-zinc-300 text-zinc-950 rounded-lg shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={sgf.image || "/avatarUnknow.png"}
                      alt={sgf.name || "Unknown"}
                      className="w-16 h-16"
                    />
                  </Avatar>
                  <span className="font-medium">{sgf.name || "Unknown"}</span>
                </div>
                <div className="flex space-x-2">
                  {sgf.isRequested ? (
                    <Button
                      onClick={() => handleUndoFriend(sgf._id)}
                      className="bg-red-800 hover:bg-red-800 duration-300 ease-in-out px-8 text-zinc-100"
                    >
                      Hủy Kết bạn
                      <span>
                        <IoIosPersonAdd />
                      </span>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddFriend(sgf._id)}
                      className="bg-sky-600 hover:bg-sky-700 duration-300 ease-in-out px-8 text-zinc-100"
                    >
                      kết bạn
                      <span>
                        <IoIosPersonAdd />
                      </span>
                    </Button>
                  )}

                  {/* <AlertDialog>
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
                </AlertDialog> */}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
