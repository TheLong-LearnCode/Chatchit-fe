"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { RiImageEditFill } from "react-icons/ri";

export default function Profile() {
  const { data: session } = useSession();
  const [avatar, setAvatar] = useState<any>(session?.user.image);
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center min-h-96 justify-center p-6">
      <Card className="w-full max-w-md  shadow-lg rounded-lg">
        <CardHeader className="flex flex-col items-center">
          {/* Avatar */}
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

          {/* Tên & Email */}
          <CardTitle className="text-xl font-semibold mt-4">
            {session?.user.name}
          </CardTitle>
          <p className="text-gray-500 text-sm">{session?.user.email}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Trạng thái tài khoản */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Status:</span>
            <Badge
              className={
                session?.user.isActive
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }
            >
              {session?.user.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardContent>
        <Button>Lưu</Button>
      </Card>
    </div>
  );
}
