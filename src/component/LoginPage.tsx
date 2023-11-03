"use client";
import { sign } from "crypto";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "semantic-ui-react";
import { UserCard } from "./UserCard";
import DataContent from "./DataContent";
type LoginProps = {
  filterValue: string;
};
export default function Login({ filterValue }: LoginProps) {
  //get session from nextAuth
  const { data: session } = useSession();
  const code: string = session?.access_token as string;

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
        {/* <UserCard user={session?.user} /> */}
        <DataContent token={code} filterValue={filterValue} />
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
