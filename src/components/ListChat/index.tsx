"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import GroupCreate from "@/components/ListChat/GroupCreate";

export default function ListChat() {
  const friendsAndGroups = [
    {
      id: 1,
      name: "Khoa bảnh trai",
      avatar: "/avatar.jpg",
      status: "online",
    },
    {
      id: 2,
      name: "Mỹ iu",
      avatar: "/my.jpg",
      status: "offline",
    },
    {
      id: 3,
      name: "Family Group",
      avatar: "/stone.JPG",
      status: "online",
    },
    {
      id: 4,
      name: "Bảo bối",
      avatar: "/Bao.png",
      status: "online",
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-full mr-2">
          <Input
            placeholder="Search friends or groups..."
            className="w-full pr-10"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <GroupCreate />
      </div>

      <div className="space-y-2">
        {friendsAndGroups.map((item) => (
          <Card
            key={item.id}
            className="p-4 cursor-pointer transition-all easeInOut duration-300 hover:shadow-lg hover:bg-zinc-800"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={item.avatar}
                  alt={`${item.name}'s avatar`}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
