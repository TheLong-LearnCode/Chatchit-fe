"use client";
import LoginForm from "@/app/(auth)/login/LoginForm";
import { ModeToggle } from "@/components/toggle-theme";
import React from "react";

export default function Login() {
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
