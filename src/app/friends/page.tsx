"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import AllFriends from "@/app/friends/AllFriends";
import FriendRequest from "@/app/friends/FriendRequest";
import CloseFriends from "@/app/friends/CloseFriends";
import BlackList from "@/app/friends/BlackList";
import { GiClover, GiThreeFriends } from "react-icons/gi";
import { SiAdblock, SiDreamstime } from "react-icons/si";
import SuggestedFriends from "@/app/friends/SuggestedFriends";
import { FaBoltLightning } from "react-icons/fa6";


export default function Friends() {
  return (
    <div className="p-6  min-h-screen">
      <div className="max-w-4xl mx-auto shadow-md dark:bg-zinc-900 rounded-lg p-6">
        <Tabs defaultValue="all-friends" className="w-full">
          <TabsList className="flex justify-center space-x-4 mb-6 w-full">
            <TabsTrigger
              value="all-friends"
              className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:text-gray-800 hover:border-gray-400 transition"
            >
              All Friends
              <span className="text-sky-500">
              <GiThreeFriends />
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="requests"
              className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:text-gray-800 hover:border-gray-400 transition"
            >
              Requests
              <span className="text-rose-500">
              <SiDreamstime />
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="close-friends"
              className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:text-gray-800 hover:border-gray-400 transition"
            >
              Close Friends
              <span className="text-emerald-500">
                <GiClover />
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="sg-friends"
              className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:text-gray-800 hover:border-gray-400 transition"
            >
              Suggested
              <span className="text-yellow-500">
              <FaBoltLightning />
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="black-list"
              className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent hover:text-gray-800 hover:border-gray-400 transition"
            >
              Black List
              <span className="text-amber-500">
              <SiAdblock />
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-friends">
            <motion.div
              key="all-friends"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <AllFriends />
            </motion.div>
          </TabsContent>

          <TabsContent value="requests">
            <motion.div
              key="requests"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <FriendRequest />
            </motion.div>
          </TabsContent>

          <TabsContent value="close-friends">
            <motion.div
              key="close-friends"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <CloseFriends />
            </motion.div>
          </TabsContent>

          <TabsContent value="sg-friends">
            <motion.div
              key="sg-friends"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <SuggestedFriends />
            </motion.div>
          </TabsContent>

          <TabsContent value="black-list">
            <motion.div
              key="black-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <BlackList />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
