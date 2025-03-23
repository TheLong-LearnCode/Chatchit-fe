import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";

export default function CloseFriends() {
  return (
    <div>
      <ul className="space-y-2">
        <li className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={"/my.jpg"}
                alt={"anh Mỹ"}
                className="w-16 h-16"
              />
            </Avatar>
            <span className="font-medium">Mỹ Đai Trẹp</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="default">Nhắn tin</Button>
            <Button variant="destructive">Hết thân</Button>
          </div>
        </li>
      </ul>
    </div>
  );
}
