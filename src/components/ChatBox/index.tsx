/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiSend } from "react-icons/fi";
import { io } from "socket.io-client";
import Image from "next/image";
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
import DropdownMenuOption from "@/components/ChatBox/DropdownMenuOption";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaJoint } from "react-icons/fa6";
import "./index.css";
import { toast } from "react-toastify";

export default function ChatBox() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Xử lý gửi tin nhắn
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        text: input,
        sender: "user",
        name: session?.user?.name,
        avatar: session?.user?.image,
        time: dayjs().format("HH:mm"),
      },
    ]);
    setInput("");
    socketRef.current.emit(
      "newMessage",
      JSON.stringify({
        content: input,
      })
    );
  };

  // Lấy id user
  const id = session?.user?._id;

  const [userJoin, setUserJoin] = useState<IUserJoin[]>([]);
  useEffect(() => {
    if (!session || !session.backendTokens?.accessToken) return;
    //Lẩy token
    const token = session?.backendTokens?.accessToken;

    // Lấy tất cả chat trong phòng
    axios
      .get(`${API_URL}chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const allChatsFormat = data.map(
          (chat: {
            content: string;
            name: string;
            image: string;
            userID: string;
            createdAt: string;
          }) => ({
            text: chat.content,
            name: chat.name,
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

    // Kết nối tới server của socket
    socketRef.current = io("http://localhost:3002", {
      extraHeaders: { token },
    });

    // Khi có một người khác vào phòng
    socketRef.current.on("user-join", (user: any) => {
      console.log("checK >>>>>", user.usersInRoom);
      setUserJoin(user.usersInRoom);

      // Sau 5 giây, thêm user mới vào danh sách
      setTimeout(() => {
        setUserJoin((prev) => {
          const newUser = user.usersInRoom.find(
            (u: any) => !prev.some((p) => p._id === u._id)
          );
          if (!newUser) return prev; // Nếu không có user mới, giữ nguyên danh sách

          return [...prev, { ...newUser, isNew: true }];
        });

        // Sau 3 giây, bỏ trạng thái `isNew`
        setTimeout(() => {
          setUserJoin((prev) =>
            prev.map((u) => (u.isNew ? { ...u, isNew: false } : u))
          );
        }, 3000);
      }, 5000);
      toast.info(`${user.name} đã tham gia phòng chat`);
    });

    // Khi User rời khỏi phòng
    socketRef.current.on("user-left", (user: any) => {
      console.log(`user rời khỏi phòng`, user);
      setTimeout(() => {
        setUserJoin((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, isLeaving: true } : u))
        );

        // Sau khi hiệu ứng chạy xong (0.5s), xóa user khỏi danh sách
        setTimeout(() => {
          setUserJoin((prev) => prev.filter((u) => u._id !== user._id));
        }, 500); // Delay tương ứng với animation CSS
      }, 5000);
      toast.warn(`${user.name} đã rời khỏi phòng chat`);
    });

    // Nhận phản hồi khi có ai đó nhắn tin
    socketRef.current.on(
      "reply",
      (data: {
        content: string;
        avatar: string;
        name: string;
        userID: string;
        createdAt: string;
      }) => {
        console.log(data);
        setMessages((prev: any) => [
          ...prev,
          {
            text: data.content,
            name: data.name,
            avatar: data.avatar,
            sender: "bot",
            userID: data.userID,
            time: dayjs(data.createdAt).format("HH:mm"),
          },
        ]);
      }
    );

    return () => {
      socketRef.current.disconnect();
    };
  }, [session, id]);

  // Scroll tới tin nhắn cuối

  useEffect(() => {
    // console.log("tin nhắn >>>",messages);
    // console.log(messages[messages.length - 1].userID);
    // console.log(id)
    // if (messages[messages.length - 1].userID === id) {
    //   console.log("scroll nè")
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }
  }, [messages]);

  return (
    <>
      <Card className="w-full mt-3 max-w-6xl shadow-lg border rounded-2xl relative">
        <Button
          variant="outline"
          className="absolute top-2 right-1/2 animate-[pulse_3s_infinite]"
          onClick={() => setIsDialogOpen(true)}
        >
          <FaJoint />
          <span className="text-sm font-medium">{userJoin.length}</span>
        </Button>

        <CardContent className="p-5 pb-0">
          <ScrollArea className="h-120 overflow-y-auto border-b pb-3">
            <div className="flex flex-col gap-1 ">
              {/* So sánh sender để kiểm tra xem tin nhắn nào đầu tiên và cuối cùng */}
              {messages?.map((msg: any, index: number) => {
                const isFirstMessageBySender =
                  index === 0 || messages[index - 1]?.sender !== msg.sender;
                const isLastMessageBySender =
                  index === messages.length - 1 ||
                  messages[index + 1]?.sender !== msg.sender;

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
                          {isFirstMessageBySender && (
                            <div className="text-md text-gray-500">
                              {msg.name}
                            </div>
                          )}

                          <div
                            key={index}
                            className={`p-2 max-w-xs rounded-lg mb-1 dark:bg-gray-200 dark:text-gray-800 bg-gray-800 text-gray-200 self-end`}
                          >
                            {msg.text}
                            {isLastMessageBySender && (
                              <div className="text-sm text-right dark:text-gray-400 text-gray-500">
                                {msg.time}
                              </div>
                            )}
                          </div>
                        </div>
                        {isFirstMessageBySender && (
                          <Image
                            src={msg.avatar}
                            alt="avatar"
                            height={40}
                            width={40}
                            className="object-contain rounded-full mt-7"
                          />
                        )}
                        {!isFirstMessageBySender && (
                          <div className="w-10"></div>
                        )}
                      </>
                    ) : (
                      <>
                        {!isFirstMessageBySender && (
                          <div className="w-10"></div>
                        )}
                        {isFirstMessageBySender && (
                          <Image
                            src={msg.avatar}
                            alt="avatar"
                            height={40}
                            width={40}
                            className="object-contain rounded-full mt-7"
                          />
                        )}
                        <div className="flex flex-col gap-1 items-start">
                          {isFirstMessageBySender && (
                            <div className="text-md text-gray-500">
                              {msg.name}
                            </div>
                          )}

                          <div
                            key={index}
                            className={`p-2 max-w-xs rounded-lg mb-1 dark:bg-pink-800 text-white bg-pink-400 self-start`}
                          >
                            {msg.text}
                            {isLastMessageBySender && (
                              <div className="text-sm text-right text-gray-50">
                                {msg.time}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="flex items-center gap-2 pt-3">
            <DropdownMenuOption />
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
              <PopoverContent  className="w-48 translate-x-[-190px]">
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
        </CardContent>
      </Card>

      {/* Dialog hiển thị danh sách người dùng */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]  bg-zinc-800">
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
    </>
  );
}
