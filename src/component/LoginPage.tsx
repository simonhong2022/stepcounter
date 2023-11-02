"use client";
import { sign } from "crypto";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "semantic-ui-react";
import { UserCard } from "./UserCard";

export default function Login() {
  //get session from nextAuth
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          onClick={() => signOut()}
          type="button"
          className="btn btn-primary"
        >
          Sign Out of Google
        </button>
        {}
        <UserCard user={session?.user} />
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
