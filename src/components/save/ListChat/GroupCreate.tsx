"use client";
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
import React, { useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { RiImageEditFill } from "react-icons/ri";
import { createGroupChat, getAllFriend } from "@/service/api";
import { handleAvatarChangeHelper } from "@/helpers/imageToBase64";
import { useSession } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function GroupCreate({ setIsRefresh }: any) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [nameGroup, setNameGroup] = useState<string>();
  const [friends, setFriends] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { data: session } = useSession();

  const [selectedFriends, setSelectedFriends] = useState<Set<string>>(
    new Set()
  );
  useEffect(() => {
    if (!session || !session.backendTokens?.accessToken) return;
    //Lẩy token
    const token = session?.backendTokens?.accessToken;
  }, [session]);

  const toggleSelectFriend = (friendId: string) => {
    setSelectedFriends((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(friendId)) {
        newSelected.delete(friendId);
      } else {
        newSelected.add(friendId);
      }
      console.log(newSelected);
      return newSelected;
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleAvatarChangeHelper(event, setAvatar);
  };

  const fetchApiAllFriend = async () => {
    const response = await getAllFriend();
    setFriends(response);
  };

  const handleDialogOpenChange = (open: boolean) => {
    console.log(open);
    setIsDialogOpen(open);
    const newSelected = new Set([]);
    setSelectedFriends(newSelected);
    if (open) {
      fetchApiAllFriend();
    }
  };

  const handleCreateGroup = async () => {
    setIsSubmit(true);
    const data = {
      image: avatar || null,
      name: nameGroup,
      isGroup: true,
      participants: [...selectedFriends],
      createdBy: session?.user._id,
    };
    try {
      const response = await createGroupChat(data);
      if (response.status !== 400) {
        setIsDialogOpen(false);
        setIsRefresh((prev: any) => !prev);
        setIsSubmit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <HiUserGroup />
        </Button>
      </DialogTrigger>
      {isDialogOpen && (
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
                onChange={(e: any) => setNameGroup(e.target.value)}
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
                  Đã chọn ({selectedFriends.size})
                </span>
              </Label>
              <ScrollArea className=" h-40 overflow-y-auto  pr-3">
                <div className="">
                  {friends.map((friend: any, index) => (
                    <div
                      key={friend._id}
                      onClick={() => toggleSelectFriend(friend._id)}
                      className={`flex items-center space-x-4 p-2 rounded-md cursor-pointer
                      ${
                        selectedFriends.has(friend._id)
                          ? "bg-gray-800 text-white"
                          : "hover:bg-gray-800"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`friend-${friend._id}`}
                        className="w-4 h-4 border-gray-300 rounded pointer-events-none"
                        checked={selectedFriends.has(friend._id)}
                        onClick={() => toggleSelectFriend(friend._id)}
                      />
                      <label
                        htmlFor={`friend-${friend.id}`}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <Avatar className="w-10 h-10">
                          {friend.image ? (
                            <AvatarImage src={friend.image} alt={friend.name} />
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
              </ScrollArea>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                className="px-8 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={() => handleDialogOpenChange(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={
                  [...selectedFriends].length > 0 && nameGroup && !isSubmit
                    ? false
                    : true
                }
                className="px-8 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md hover:from-blue-600 hover:to-purple-600"
                onClick={handleCreateGroup}
              >
                {isSubmit ? "Đang tạo..." : "Tạo"}
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
