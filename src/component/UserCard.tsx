import { DefaultSession } from "next-auth";

export function UserCard({ user }: { user: DefaultSession["user"] }) {
  return (
    <div>
      <div>
        <p>Current Logged In User</p>
        <h5>{user?.name}</h5>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}
