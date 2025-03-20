"use client";
import RegisterForm from "@/app/(auth)/register/RegisterForm";
import { ModeToggle } from "@/components/toggle-theme";
import React from "react";

export default function Register() {
  return (
    <div className="relative">
      <div className="animated-bg">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
