"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatBox() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "This is a bot response!", sender: "bot" }]);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-6xl h-full mx-auto shadow-lg border rounded-2xl">
      <CardContent className="p-4">
        <ScrollArea className="h-120 overflow-y-auto border-b pb-3">
          <div className="flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 max-w-xs rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center gap-2 pt-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
