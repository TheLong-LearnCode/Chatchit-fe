"use client";
import LoginForm from "@/app/(auth)/login/LoginForm";
import { ModeToggle } from "@/components/toggle-theme";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  
    useEffect(() => {
      if (session) {
        router.push("/");
      }
    }, [session, router]);

  return (
    <div className="relative">
      <div className="animated-bg">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
