import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    refreshToken: string;
    //accessTokenExpires: number;
  }

  interface Session extends DefaultSession {
    user: User;
    expires: string;
    error: string;
    access_token?: string;
  }
}
