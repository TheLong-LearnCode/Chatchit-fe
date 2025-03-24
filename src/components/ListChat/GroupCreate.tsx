import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useState } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { RiImageEditFill } from "react-icons/ri";

export default function GroupCreate() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedFriends((prev) =>
      prev.includes(id)
        ? prev.filter((friendId) => friendId !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <HiUserGroup />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-center">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Avatar className="w-24 h-24">
                {avatar ? (
                  <AvatarImage src={avatar} alt="Avatar" />
                ) : (
                  <AvatarFallback className="flex items-center justify-center bg-gray-300 text-gray-500 hover:bg-gray-400 duration-300">
                    <RiImageEditFill className="w-10 h-10" />
                  </AvatarFallback>
                )}
              </Avatar>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {/* Nhập tên nhóm */}
          <div className="space-y-2">
            <Label
              htmlFor="group-name"
              className="text-sm font-medium text-gray-700"
            >
              Tên nhóm
            </Label>
            <Input
              id="group-name"
              placeholder="Nhập tên nhóm"
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Chọn bạn */}
          <div className="space-y-2">
            <Label
              htmlFor="select-friends"
              className="text-sm font-medium text-gray-700 flex justify-between"
            >
              <span>Chọn bạn</span>
              <span className="text-sm text-gray-500">
                Đã chọn ({selectedFriends.length})
              </span>
            </Label>
            <div className="space-y-4">
              {[
                { id: 1, name: "Anh Mỹ", avatar: "/my.jpg" },
                { id: 2, name: "Khoa iu", avatar: "/avatar.jpg" },
                { id: 3, name: "Bỉu Ao", avatar: "/Bao.png" },
              ].map((friend) => (
                <div
                  key={friend.id}
                  className={`flex items-center space-x-4 p-2 rounded-md `}
                >
                  <input
                    type="checkbox"
                    id={`friend-${friend.id}`}
                    className="w-4 h-4 border-gray-300 rounded"
                    checked={selectedFriends.includes(friend.id)}
                    onChange={() => handleCheckboxChange(friend.id)}
                  />
                  <label
                    htmlFor={`friend-${friend.id}`}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <Avatar className="w-10 h-10">
                      {friend.avatar ? (
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                      ) : (
                        <AvatarFallback className="bg-gray-300 text-gray-500">
                          {friend.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium text-zinc-400">
                      {friend.name}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              className="px-8 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="px-8 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md hover:from-blue-600 hover:to-purple-600"
            >
              Tạo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
