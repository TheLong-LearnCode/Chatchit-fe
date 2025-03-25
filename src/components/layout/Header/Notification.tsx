/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { FaBell } from "react-icons/fa";

export default function Notification() {
    
  const notifications = [
    {
      id: 1,
      name: "Khoa",
      info: "Sent you a message",
      avatar: "/avatar.jpg",
    },
    {
      id: 2,
      name: "Bảo",
      info: "Liked your post",
      avatar: "/Bao.png",
    },
    {
      id: 3,
      name: "Mỹ",
      info: "Commented on your photo",
      avatar: "/my.jpg",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <FaBell />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-zinc-900">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 m-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center space-x-4 p-2 border rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Avatar className="w-12 h-12"> 
                {notification.avatar ? (
                  <AvatarImage
                    src={notification.avatar}
                    alt={notification.name}
                  />
                ) : (
                  <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="font-medium">{notification.name}</p>
                <p className="text-sm text-gray-500">{notification.info}</p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
