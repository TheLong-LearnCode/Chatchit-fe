"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3002";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const socketRef = useRef<Socket | null>(null); // Dùng Ref để giữ socket sau reload
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user) return;
    const token = session.backendTokens.accessToken;
    // Nếu đã có socket thì không tạo mới
    if (!socketRef.current) {
      socketRef.current = io(SERVER_URL, {
        extraHeaders: { token },
      });

      socketRef.current.on("connect", () => {
        console.log("Connected to socket:", socketRef.current?.id);
        setIsConnected(true);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Disconnected from socket");
        setIsConnected(false);
      });
    }

    return () => {
      // Không disconnect khi unmount để giữ kết nối
    };
  }, [session, status]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
