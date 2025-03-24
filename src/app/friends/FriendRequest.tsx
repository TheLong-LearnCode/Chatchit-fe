import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";
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
import { BsBookmarkCheckFill } from "react-icons/bs";

export default function FriendRequest() {
  return (
    <div>
      <div className="mb-4 w-full flex items-center justify-center">
        <div className="relative w-80 mr-2">
          <Input
            placeholder="Search request..."
            className="w-full pr-10"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <ul className="space-y-2">
        <li className="p-3 bg-zinc-200 text-zinc-950 rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={"/Bao.png"}
                alt={"Bảo Bối"}
                className="w-16 h-16"
              />
            </Avatar>
            <span className="font-medium">Bảo bối</span>
          </div>
          <div className="flex space-x-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700 duration-300 ease-in-out px-8 text-zinc-100">
              Đồng ý
              <span>
              <BsBookmarkCheckFill />
              </span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger>
              <Button className="bg-rose-600 hover:bg-rose-700 duration-300 ease-in-out px-8 text-zinc-100">Từ chối</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-800">
                <AlertDialogHeader>
                  <AlertDialogTitle>Bạn chắc chứ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bấm xác nhận để xóa lời mời kết bạn của <strong className="text-zinc-100">Bảo bối</strong>
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
      </ul>
    </div>
  );
}
