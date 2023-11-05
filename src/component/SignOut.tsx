import { signOut } from "next-auth/react";
import { Button } from "semantic-ui-react";

export function SignOut() {
  return (
    <Button
      floated="right"
      onClick={() => signOut()}
      type="button"
      className="sign-out"
    >
      Sign Out
    </Button>
  );
}
