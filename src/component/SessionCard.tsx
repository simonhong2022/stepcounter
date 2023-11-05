import { SessionInfo } from "@/type/type";
import { useState } from "react";
import { Button, Card, Icon, Modal } from "semantic-ui-react";
import getHoursfromMillisec from "@/helper/method";

type sessionCardProps = {
  session: SessionInfo;
  section: string;
};

export default function SessionCard({ session, section }: sessionCardProps) {
  const [open, setOpen] = useState(false);
  let startTime = new Date(parseInt(session.startTimeMillis));
  let endTime = new Date(parseInt(session.endTimeMillis));

  return (
    <div className="session-card">
      <Modal
        className="session-card"
        animation={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Card>
            <Card.Content>
              <Card.Header>
                {section.toUpperCase()} in {startTime.toDateString()}
              </Card.Header>
              <Card.Meta>{session.description}</Card.Meta>
              <Card.Description>
                Start: {startTime.toLocaleString()}
              </Card.Description>
              <Card.Description>
                End: {endTime.toLocaleString()}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon color="blue" name="hashtag" />
              Duration:{" "}
              {getHoursfromMillisec(
                parseInt(session.endTimeMillis) -
                  parseInt(session.startTimeMillis)
              )}
            </Card.Content>
          </Card>
        }
      >
        <Modal.Header>
          {section.toUpperCase()} in {startTime.toDateString()}
        </Modal.Header>

        <Modal.Content>
          <Modal.Description>
            Description: {session.description}
          </Modal.Description>
          <Modal.Description>
            You started this {section} at {startTime.toLocaleString()} and
            finished at {endTime.toLocaleString()}.{" "}
          </Modal.Description>
          <Modal.Description>
            Total duration for this session was{" "}
            {getHoursfromMillisec(
              parseInt(session.endTimeMillis) -
                parseInt(session.startTimeMillis)
            )}
            .{" "}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
