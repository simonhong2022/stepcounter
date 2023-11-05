import { updateUserActivityGoal } from "@/pages/api/apiClient";
import { User } from "@/type/type";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";

type props = {
  email: string;
  setUser: Dispatch<SetStateAction<User>>;
};

export function UpdateActivityGoal({ email, setUser }: props) {
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  return (
    <Modal
      animation={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="green">Or Challenge/Adjust yourself</Button>}
    >
      <Modal.Header>Challenge/Adjust Your Activity Goal</Modal.Header>
      <Modal.Content>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            updateUserActivityGoal(email, e, setUser, setOpen, setErrMessage);
          }}
        >
          <Form.Field>
            <Label>Activity Goal</Label>
            <Input
              placeholder="Raise your activity goal"
              type="number"
              name="activityGoal"
              required="required"
            />
          </Form.Field>
          <Button type="submit">Edit Your Goal +</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
