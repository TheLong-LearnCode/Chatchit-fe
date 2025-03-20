"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

export default function ButtonLogout() {
  return (
    <div>
      <Button
        onClick={() => signOut()}
        className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-orange-600 transition-all duration-300"
      >
        Log out
      </Button>
    </div>
  );
}
