"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "@/socket.io/socketContext";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <SocketProvider>{children}</SocketProvider>
    </SessionProvider>
  );
};

export default Providers;
