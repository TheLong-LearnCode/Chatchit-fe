import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
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
import { useSession } from "next-auth/react";
import { acceptRequest, getAllRequest, rejectRequest } from "@/service/api";
import { io } from "socket.io-client";

export default function FriendRequest() {
  const [requests, setRequests] = useState([]);
  const { data: session } = useSession();
  const socketRef = useRef<any>(null);
  useEffect(() => {
    if (!session || !session.backendTokens?.accessToken) return;
    //Lẩy token
    const token = session?.backendTokens?.accessToken;
    socketRef.current = io("http://localhost:3002", {
      extraHeaders: { token },
    });
    socketRef.current.on("receiveRequest", (data: any) => {
      console.log(data);
    });
    const fetchApiRequest = async () => {
      const response = await getAllRequest(session?.user._id);
      setRequests(response);
    };
    fetchApiRequest();
  }, []);

  const handleAcceptRequest = async (requestID: string) => {
    try {
      const respone = await acceptRequest(requestID);
      if (respone) {
        const updatedrequests = [...requests];
        const index = requests.findIndex(
          (req: any) => req.request._id === requestID
        );
        if (index !== -1) {
          updatedrequests.splice(index, 1);
        }
        setRequests(updatedrequests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectRequest = async (requestID: string) => {
    try {
      const respone = await rejectRequest(requestID);
      if (respone) {
        const updatedrequests = [...requests];
        const index = requests.findIndex(
          (req: any) => req.request._id === requestID
        );
        if (index !== -1) {
          updatedrequests.splice(index, 1);
        }
        setRequests(updatedrequests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-4 w-full flex items-center justify-center">
        <div className="relative w-80 mr-2">
          <Input placeholder="Search request..." className="w-full pr-10" />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <ul className="space-y-2">
        {requests.map((req: any, index) => (
          <li
            className="p-3 bg-zinc-300 text-zinc-950 rounded-lg shadow-sm flex items-center justify-between"
            key={index}
          >
            <div className="flex items-center space-x-3">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={req?.user.image || "avatarUnknow.png"}
                  alt={"Bảo Bối"}
                  className="w-16 h-16"
                />
              </Avatar>
              <span className="font-medium">{req?.user.name}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 duration-300 ease-in-out px-8 text-zinc-100"
                onClick={() => handleAcceptRequest(req.request._id)}
              >
                Đồng ý
                <span>
                  <BsBookmarkCheckFill />
                </span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className="bg-rose-600 hover:bg-rose-700 duration-300 ease-in-out px-8 text-zinc-100">
                    Từ chối
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-zinc-950  border-2 border-b-accent-foreground ">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Bạn chắc chứ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bấm xác nhận để xóa lời mời kết bạn của{" "}
                      <strong className="text-zinc-100">{req.user.name}</strong>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleRejectRequest(req.request._id)}
                    >
                      Xác nhận
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
