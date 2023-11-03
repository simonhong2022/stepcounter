import { DataSet, SessionInfo, StepInfo } from "@/type/type";
import PointTable from "./PointTable";
import { useState } from "react";
import { Button, Card, Modal } from "semantic-ui-react";

type sessionCardProps = {
  session: SessionInfo;
  section: string;
};

export default function sessionCard({ session, section }: sessionCardProps) {
  const [open, setOpen] = useState(false);
  let startTime = new Date(parseInt(session.startTimeMillis));
  let endTime = new Date(parseInt(session.endTimeMillis));

  function getYoutubeLikeToDisplay(millisec: number) {
    var seconds: string = (millisec / 1000).toFixed(0);
    var minutes: string = Math.floor(parseInt(seconds) / 60).toString();
    var hours: string = "";
    if (parseInt(minutes) > 59) {
      hours = Math.floor(parseInt(minutes) / 60).toString();
      hours = parseInt(hours) >= 10 ? hours : "0" + hours;
      minutes = (parseInt(minutes) - parseInt(hours) * 60).toString();
      minutes = parseInt(minutes) >= 10 ? minutes : "0" + minutes;
    }

    seconds = Math.floor(parseInt(seconds) % 60).toString();
    seconds = parseInt(seconds) >= 10 ? seconds : "0" + seconds;
    if (hours != "") {
      return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
  }
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
            {getYoutubeLikeToDisplay(
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
