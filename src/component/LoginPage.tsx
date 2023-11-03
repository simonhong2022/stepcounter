"use client";
import { sign } from "crypto";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Form, Input, Label, Message, Modal } from "semantic-ui-react";
import { UserCard } from "./UserCard";
import DataContent from "./DataContent";
import { useState } from "react";
type LoginProps = {
  filterValue: string;
};
export default function Login({ filterValue }: LoginProps) {
  //get session from nextAuth
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const code: string = session?.access_token as string;

  if (session) {
    return (
      <>
        <Modal
          animation={false}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button className="teams-modal-btn" color="orange">
              Make Your Goal for Activities +
            </Button>
          }
        >
          <Modal.Header>Make Your Goal for Activities</Modal.Header>
          <Modal.Content>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                //addTeam(e, setTeams, setOpen, setErrMessage);
              }}
            >
              <Form.Field>
                <Label>Duration</Label>
                <Input
                  icon="grap"
                  placeholder="Type your duration goal"
                  type="text"
                  name="duration"
                />
              </Form.Field>
              <Button type="submit">Add your goal +</Button>
            </Form>
            {errMessage.length > 0 ? (
              <Message warning>
                <p>{errMessage}</p>
              </Message>
            ) : null}
          </Modal.Content>
        </Modal>
        <Button onClick={() => signOut()} type="button" className="">
          Sign Out of Google
        </Button>
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
