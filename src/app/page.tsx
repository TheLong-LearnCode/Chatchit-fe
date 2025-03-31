"use client";
import Footer from "@/components/layout/Footer";
import ChatBox from "@/components/save/ChatBox";
import ListChat from "@/components/save/ListChat";
import { friendsAndGroupChat } from "@/service/api";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedConversationId, setSelectedConversationId] = useState();
  const [isRefreshListChat,setIsRefreshListChat] = useState();
  return (
    <div className="flex flex-col h-full">
      <main className="flex flex-1 gap-3">
        <div className="w-1/4 border-r">
          <ListChat onSelectConversation={setSelectedConversationId}   />
        </div>
        <div className="flex-1 h-full">
          {selectedConversationId ? (
            <ChatBox conversationId={selectedConversationId}  />
          ) : (
            <p className="text-center mt-10">Chọn một hội thoại để chat</p>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
