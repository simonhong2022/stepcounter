import { SessionInfo } from "@/type/type";
import { useState } from "react";
import { Button, Card, Modal } from "semantic-ui-react";
import getHoursfromMillisec from "@/helper/method";

type sessionCardProps = {
  session: SessionInfo;
  section: string;
};

export default function sessionCard({ session, section }: sessionCardProps) {
  const [open, setOpen] = useState(false);
  let startTime = new Date(parseInt(session.startTimeMillis));
  let endTime = new Date(parseInt(session.endTimeMillis));

  return (
    <Modal
      animation={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Card>
          <Card.Content>
            <Card.Header>{section.toUpperCase()}</Card.Header>
            <Card.Meta>{session.description}</Card.Meta>
            <Card.Description>
              Start: {startTime.toLocaleString()}
            </Card.Description>
            <Card.Description>End: {endTime.toLocaleString()}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            Duration:{" "}
            {getHoursfromMillisec(
              parseInt(session.endTimeMillis) -
                parseInt(session.startTimeMillis)
            )}
          </Card.Content>
        </Card>
      }
    >
      <Modal.Header>{section}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{session.description}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}
