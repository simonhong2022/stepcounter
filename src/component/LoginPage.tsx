"use client";
import { signIn, useSession } from "next-auth/react";
import DataContent from "./DataContent";
import { useState } from "react";
import { User } from "@/type/type";
import { initUser } from "@/helper/initializer";
type LoginProps = {
  filterValue: string;
};
export default function Login({ filterValue }: LoginProps) {
  //get session from nextAuth
  const { data: session } = useSession();
  const code: string = session?.access_token as string;
  const email: string = session?.user.email as string;

  if (session) {
    return (
      <>
        <DataContent token={code} filterValue={filterValue} email={email} />
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={() => signIn()}
          type="button"
          className="btn btn-primary"
        >
          Sign In with Google
        </button>
      </>
    );
  }
}
