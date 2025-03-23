"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Profile() {
  const {data: session} = useSession();
  return (
    <div className="flex items-center min-h-96 justify-center p-6">
      <Card className="w-full max-w-md  shadow-lg rounded-lg">
        <CardHeader className="flex flex-col items-center">
          {/* Avatar */}
          <Avatar className="w-24 h-24 border-2 border-gray-300">
            <AvatarImage src={session?.user.image} alt={session?.user.name} />
            <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Tên & Email */}
          <CardTitle className="text-xl font-semibold mt-4">{session?.user.name}</CardTitle>
          <p className="text-gray-500 text-sm">{session?.user.email}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Trạng thái tài khoản */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Status:</span>
            <Badge
              className={session?.user.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"}
            >
              {session?.user.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
