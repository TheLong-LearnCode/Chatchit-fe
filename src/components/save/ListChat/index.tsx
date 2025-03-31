"use client";
import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import GroupCreate from "@/components/save/ListChat/GroupCreate";
import { friendsAndGroupChat } from "@/service/api";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import AddFunctionChat from "./AddFunctionChat";
import { io } from "socket.io-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { useSocket } from "@/socket.io/socketContext";

export default function ListChat({ onSelectConversation }: any) {
  const { data: session } = useSession();
  const [friendsAndGroups, setfriendsAndGroups] = useState([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const socketRef = useRef<any>(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { socket } = useSocket();
  console.log("Socket instance:", socket);

  useEffect(() => {
    if (!session || !session.backendTokens?.accessToken) return;
    if (!socket) {
      return;
    }
    socket.on("updateLastMessage", (data) => {
      // toast.dark(`📩 ${data.content} `);
      console.log(data)
      // console.log(friendsAndGroupChat)
      setfriendsAndGroups((prev: any) =>
        prev.map((group: any) =>
          group._id == data.conversationID.toString()
            ? {
                ...group,
                name_user_send: data.name,
                last_message: data.content,
                last_user_send: data.userID,
              }
            : group
        )
      );
    });
    // socket.on("updateLastMessage", (data) => {
    //   toast.dark(`📩 ${data.content} `);
    // });

    //Lẩy token
    // const token = session?.backendTokens?.accessToken;
    // socketRef.current = io("http://localhost:3002", {
    //   extraHeaders: { token: session?.backendTokens?.accessToken },
    // });
    const fetchApi = async () => {
      setIsLoading(true);
      const response = await friendsAndGroupChat();
      setfriendsAndGroups(response);
      setIsLoading(false);
    };

    fetchApi();
  }, [session?.backendTokens?.accessToken, isRefresh, socket]);

  const handleChooseGroupChat = (conversationID: string) => {
    onSelectConversation(conversationID);
    // socketRef.current.emit("join-conversation", conversationID);
  };
  const skeletonArray = new Array(7).fill(null);
  return (
    <div className="p-4 ">
      {isLoading ? (
        <>
          {skeletonArray.map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-zinc-900 px-2 py-2 rounded-md mb-3"
            >
              <Skeleton className="h-15 w-15 rounded-full " />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="relative w-full mr-2">
              <Input
                placeholder="Search friends or groups..."
                className="w-full pr-10"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <GroupCreate setIsRefresh={setIsRefresh} />
          </div>
          <div>
            <ScrollArea className=" h-140   overflow-y-auto  pr-3">
              {friendsAndGroups?.map((item: any) => (
                <Card
                  key={item._id}
                  className={`p-4 mb-3 cursor-pointer   transition-all easeInOut duration-300 hover:shadow-lg border-2 hover:bg-zinc-800 ${
                    selectedId === item._id ? "border-2 border-gray-300" : ""
                  }`}
                  onClick={() => {
                    handleChooseGroupChat(item._id), setSelectedId(item._id);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
                        <Image
                          src={item?.image || "/avatarUnknow.png"}
                          alt={`${item.name}'s avatar`}
                          width={60}
                          height={60}
                          className="rounded-full h-full w-full object-cover"
                        />
                      </div>

                      {/* <span
                  className={`w-2 h-2 rounded-full ${
                    item.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span> */}
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-extrabold text-white">
                          {item.name}
                        </div>
                        {item.last_message !== null &&
                        item.last_user_send != session?.user._id ? (
                          <div className="text-xs font-sans  text-gray-400 truncate w-[200px]">
                            <span className="font-sans ">
                              {item.name_user_send}
                            </span>
                            : {item.last_message}
                          </div>
                        ) : (
                          <div className="text-xs font-sans  text-gray-400 truncate w-[200px]">
                            <span className="font-sans ">Bạn</span>:{" "}
                            {item.last_message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <AddFunctionChat
                        data={item}
                        userID={session?.user._id}
                        setIsRefresh={setIsRefresh}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}
