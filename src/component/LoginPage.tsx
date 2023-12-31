"use client";
import { signIn, useSession } from "next-auth/react";
import DataContent from "./DataContent";
import { Box, TextField } from "@mui/material";
import { Button, Icon, Message } from "semantic-ui-react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <DataContent
          token={session.access_token as string}
          email={session.user.email as string}
        />
      </>
    );
  } else {
    return (
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          noValidate
          sx={{ mt: 1 }}
        >
          <Button
            size="massive"
            inverted
            color="violet"
            type="button"
            onClick={() => signIn()}
            sx={{ mt: 5, mb: 3 }}
          >
            <Icon name="google" /> Sign In with Google
          </Button>
        </Box>
      </Box>
    );
  }
}
