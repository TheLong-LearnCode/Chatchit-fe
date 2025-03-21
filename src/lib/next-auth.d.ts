import NextAuth from "next-auth";

console.log(NextAuth);
declare module "next-auth" {
    interface Session {
        user: {
            _id: string;
            email: string;
            name: string;
            isActive: boolean;
            role: string;
            accountType: string;
            image: string;
        };
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        }
    }
}

import { JWT } from "next-auth/jwt";

console.log(JWT)

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            _id: string;
            email: string;
            name: string;
            isActive: boolean;
            role: string;
            accountType: string;
            image: string;
        };
        backendTokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        }
    }
}