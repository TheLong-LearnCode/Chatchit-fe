"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { MdDeleteForever } from "react-icons/md";
import { Modal, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { TbDotsCircleHorizontal } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import { deleteConversation, outConversation } from "@/service/api";
import { toast } from "react-toastify";
import { CiLogout } from "react-icons/ci";
import "./index";

export default function AddFunctionChat({ data, setIsRefresh, userID }: any) {
  const handleDeleteConversation = async () => {
    const response = await deleteConversation(data._id);
    if (response.status === 200) {
      toast.success("Xóa nhóm thành công");
      setIsRefresh((prev: any) => !prev);
    }
  };
  const handleOutConversation = async () => {
    const response = await outConversation(data._id);
    if (response.status === 200) {
      toast.success("Rời nhóm thành công");
      setIsRefresh((prev: any) => !prev);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TbDotsCircleHorizontal size={25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col gap-2">
          {data.createdBy === userID ? (
            <Button variant={"outline"} onClick={handleDeleteConversation}>
              <span className="text-sm">Giải tán nhóm</span>
              <DropdownMenuShortcut>
                <MdDeleteForever size={20} color="red" />
              </DropdownMenuShortcut>
            </Button>
          ) : (
            <Button variant={"outline"} onClick={handleOutConversation}>
              <span className="text-sm">Rời nhóm</span>
              <DropdownMenuShortcut>
                <CiLogout size={30} color="red" />
              </DropdownMenuShortcut>
            </Button>
          )}
         
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
