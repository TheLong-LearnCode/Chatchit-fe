"use client";
import Footer from "@/components/layout/Footer";
import ChatBox from "@/components/save/ChatBox";
import ListChat from "@/components/save/ListChat";
import SignatureLoader from "@/components/SignatureLoader";
import { useState } from "react";

export default function Home() {
  const [selectedConversationId, setSelectedConversationId] = useState();

  return (
    <div className="flex flex-col h-full">
      <main className="flex flex-1 gap-3">
        <div className="w-1/4 border-r">
          <ListChat onSelectConversation={setSelectedConversationId} />
        </div>
        <div className="flex-1 h-full">
          {selectedConversationId ? (
            <ChatBox conversationId={selectedConversationId} />
          ) : (
            <div>
              <SignatureLoader />
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
