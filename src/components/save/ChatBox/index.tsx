/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "./index.css";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiSend } from "react-icons/fi";
import { io } from "socket.io-client";
// import Image from "next/image";
import { Image } from "antd";
import { useSession } from "next-auth/react";
import IUserJoin from "@/types/user";
import axios from "axios"; // Thêm import axios
import { API_URL } from "@/lib/Constants";
import dayjs from "dayjs";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaJoint } from "react-icons/fa6";
import "./index.css";
import DropdownMenuOption from "@/components/ChatBox/DropdownMenuOption";
import { FaTimes } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import { useSocket } from "@/socket.io/socketContext";
import { toast } from "react-toastify";

export default function ChatBox({ conversationId }: any) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogAddUserOpen, setIsDialogAddUserOpen] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<{
    status: boolean;
    profile: any;
  }>({
    status: false,
    profile: {},
  });
  // Socket
  const { socket } = useSocket();
  if (!socket) return;
  // End Socket

  // Xử lý gửi tin nhắn
  const sendMessage = () => {
    if (!input.trim() && previews.length <= 0) return;
    setMessages((prevMessages: any) => [
      ...prevMessages,
      {
        text: input,
        sender: "user",
        images: previews,
        name: session?.user?.name,
        avatar: session?.user?.image,
        time: dayjs().format("HH:mm"),
      },
    ]);
    setInput("");
    setPreviews([]);
    socket.emit(
      "newMessage",
      JSON.stringify({
        conversationID: conversationId,
        content: input,
        userID: id,
        images: previews,
      })
    );
  };

  // End Xử lý gửi tin nhắn

  // Lấy id user
  const id = session?.user?._id;
  const [userJoin, setUserJoin] = useState<IUserJoin[]>([]);
  useEffect(() => {
    if (!session || !session.backendTokens?.accessToken) return;
    if (!socket) return;

    //Lẩy token
    const token = session?.backendTokens?.accessToken;

    // Gửi sự kiện join phòng
    socket.emit("join-conversation", conversationId);
    // End Gửi sự kiện join phòng

    // Lắng nghe sự kiện user mới vào phòng
    socket.on("user-joined", (data) => {
      toast.dark(`📩 ${data.username} đã vào phòng`);
    });
    // End  Lắng nghe sự kiện user mới vào phòng

    // Lắng nghe sự kiện số thành viên vào ra phòng
    const handleUpdateMembers = (data: {
      conversationId: string;
      members: any[];
    }) => {
      console.log(">>>>>>>>>>>>>>", data);
      if (data.conversationId === conversationId) {
        setUserJoin(data.members);
      }
    };
    socket.on("update-room-members", handleUpdateMembers);
    // End Lắng nghe sự kiện số thành viên vào ra phòng

    // Lắng nghe sự tin nhắn mới
    const handleReply = (data: any) => {
      console.log(">>>>>>>>>>>>>>", data);
      setMessages((prevMessages: any) => [
        ...prevMessages,
        {
          text: data.content,
          sender: "sender",
          images: data.images,
          name: data.name,
          avatar: data.avatar,
          time: dayjs().format("HH:mm"),
        },
      ]);
    };
    socket.on("reply", handleReply);
    // End Lắng nghe sự tin nhắn mới

    // Lắng nghe sự kiện typing
    socket.on("displayTyping", ({ isTyping, user }) => {
      setIsTyping((prev) => ({
        status: isTyping,
        profile: user,
      }));
    });
    // End lắng nghe sự kiện typing

    // Lấy tất cả chat trong phòng
    axios
      .get(`${API_URL}chat/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        const allChatsFormat = data.map(
          (chat: {
            content: string;
            name: string;
            Images: string[];
            image: string;
            userID: string;
            createdAt: string;
          }) => ({
            text: chat.content,
            name: chat.name,
            images: chat.Images,
            avatar: chat.image,
            sender: (chat.userID === id ? "user" : "bot") as "user" | "bot",
            time: dayjs(chat.createdAt).format("HH:mm"),
          })
        );
        setMessages(allChatsFormat);
      })
      .catch((error) => {
        console.error("Error fetching chat data:", error);
      });
    // End Lấy tất cả chat trong phòng

    // Xóa các sự kiện cũ
    return () => {
      socket.off("user-joined");
      socket.off("update-room-members", handleUpdateMembers);
      socket.off("reply", handleReply);
    };
    // End Xóa các sự kiện cũ
  }, [conversationId]);

  // Scroll tới tin nhắn cuối

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }
  }, [messages]);

  // Upload Images

  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // End Upload Images
  var timeOut: any;
  const handleTyping = () => {
    console.log("nhập");
    socket.emit("typing", { conversationId, user: session?.user });
    // clearTimeout(timeOut);
    // timeOut = setTimeout(() => {
    //   socket.emit("stopTyping", { conversationId, user: session?.user });
    // }, 1000);
  };

  return (
    <>
      <Card className="w-full mt-3 max-w-6xl h-500px shadow-lg border rounded-2xl relative shrink-0">
        {/* <div className="bg-blue-300 shrink">header carđ</div> */}

        <div className="flex justify-between w-1/2 ">
          <Button
            variant="outline"
            className=" animate-[pulse_3s_infinite] "
            onClick={() => setIsDialogAddUserOpen(true)}
          >
            <RiUserAddFill />
            <span className="text-sm font-medium h-full">
              {userJoin.length}
            </span>
          </Button>
          <Button
            variant="outline"
            className=" animate-[pulse_3s_infinite] "
            onClick={() => setIsDialogOpen(true)}
          >
            <FaJoint />
            <span className="text-sm font-medium h-full">
              {userJoin.length}
            </span>
          </Button>
        </div>

        <CardContent className="p-5 pb-0 h-auto">
          {/* Giao diện chat  */}
          <ScrollArea className="h-120 overflow-y-auto transition-all pb-3">
            <div className="flex flex-col gap-1 ">
              {/* So sánh sender để kiểm tra xem tin nhắn nào đầu tiên và cuối cùng */}
              {messages?.map((msg: any, index: number) => {
                return (
                  <div
                    key={index}
                    ref={index === messages.length - 1 ? messagesEndRef : null}
                    className={`flex gap-4 items-start ${
                      msg.sender === "user" ? " self-end" : " self-start"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <>
                        <div className="flex flex-col gap-1 items-end">
                          <div className="text-md text-gray-500">
                            {msg.name}
                          </div>
                          <div className="flex flex-wrap flex-row-reverse gap-2 max-w-[500px]">
                            {msg.images &&
                              msg.images.map((image: string, index: number) => (
                                <div
                                  key={index}
                                  className="w-[150px] h-[150px] overflow-hidden rounded-md"
                                >
                                  <Image
                                    src={image}
                                    alt="anh"
                                    height={150}
                                    width={150}
                                    className="rounded-md w-full h-full object-cover "
                                  ></Image>
                                </div>

                                // <h1>{image}</h1>
                              ))}
                          </div>
                          {msg.text !== "" && (
                            <div
                              key={index}
                              className={`p-2  max-w-xs break-words  rounded-lg mb-1 dark:bg-gray-200 dark:text-gray-800 bg-gray-800 text-gray-200 self-end`}
                            >
                              {msg.text}
                              <div className="text-sm text-right dark:text-gray-400 text-gray-500">
                                {msg.time}
                              </div>
                            </div>
                          )}
                        </div>
                        <Image
                          src={msg.avatar}
                          alt="avatar"
                          height={40}
                          width={40}
                          className="object-contain rounded-full mt-7"
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          src={msg.avatar}
                          alt="avatar"
                          height={40}
                          width={40}
                          className="object-contain rounded-full mt-7"
                        />
                        <div className="flex flex-col gap-1 items-start">
                          <div className="text-md text-gray-500">
                            {msg.name}
                          </div>
                          <div className="flex flex-wrap  gap-2 max-w-[500px]">
                            {msg.images &&
                              msg.images.map((image: string, index: number) => (
                                <div
                                  key={index}
                                  className="w-[150px] h-[150px] overflow-hidden rounded-md"
                                >
                                  <Image
                                    src={image}
                                    alt="anh"
                                    height={150}
                                    width={150}
                                    className="rounded-md w-full h-full object-cover "
                                  ></Image>
                                </div>

                                // <h1>{image}</h1>
                              ))}
                          </div>
                          {msg.text !== "" && (
                            <div
                              key={index}
                              className={`p-2 max-w-xs break-words rounded-lg mb-1 dark:bg-pink-800 text-white bg-pink-400 self-start`}
                            >
                              {msg.text}
                              <div className="text-sm text-right text-gray-50">
                                {msg.time}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Typing  */}
            {isTyping.status && (
              <div className="flex gap-3 items-center self-start mb-3 transition-all">
                <Image
                  src={isTyping.profile.image || "avatarUnknow.png"}
                  alt="avatar"
                  height={40}
                  width={40}
                  className="object-cover rounded-full shadow-md"
                />
                <div className="flex flex-col gap-1 items-start">
                  <div className="text-md text-gray-400 font-medium">
                    {isTyping.profile.name}
                  </div>

                  <div className="p-3 max-w-xs rounded-2xl bg-zinc-800 text-white shadow-lg relative">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* End Typing  */}
          </ScrollArea>
          {/* End Giao diện chat  */}

          {/* Preview Ảnh  */}
          <div className="flex gap-2 overflow-x-auto max-w-[60%]">
            {previews.map((src, index) => (
              <div key={index} className="relative w-16 h-16">
                <img
                  src={src}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  className="absolute top-0 right-0 bg-red-800 text-white rounded-full p-1 text-xs"
                  onClick={() => handleRemoveImage(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
          {/* End Preview Ảnh  */}

          {/* Chat  */}
          <div className="flex items-center gap-2 pt-3">
            <DropdownMenuOption setPreviews={setPreviews} />
            <Input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value), handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-full"
            />

            <Popover>
              <PopoverTrigger>
                <Button className="rounded-full" variant="outline">
                  <BsEmojiSmile />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 translate-x-[-190px]">
                <EmojiPicker
                  onEmojiClick={(emojiData) =>
                    setInput((prev) => prev + emojiData.emoji)
                  }
                />
              </PopoverContent>
            </Popover>
            <Button className="rounded-full" onClick={sendMessage}>
              <FiSend />
            </Button>
          </div>
          {/* End Chat  */}
        </CardContent>
      </Card>

      {/* Dialog hiển thị danh sách người dùng */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 sm:max-w-[500px]  bg-zinc-800">
          <DialogHeader>
            <DialogTitle>Người đang tham gia</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {userJoin.map((user) => (
              <div key={user._id} className="flex flex-col items-center">
                <Image
                  src={user.image ? user.image : "/avatarNone.jpg"}
                  alt={user.name}
                  height={50}
                  width={50}
                  className="rounded-full object-cover"
                />
                <span className="text-sm font-medium text-zinc-400 mt-1">
                  {user.name}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* <AddUserToRoomModal
        isDialogAddUserOpen={isDialogAddUserOpen}
        setIsDialogAddUserOpen={setIsDialogAddUserOpen}
        conversationId={conversationId}
      /> */}
    </>
  );
}
