"use client";
import Collapsible from "react-collapsible";
import {
  Header,
  Card,
  Icon,
  Popup,
  Modal,
  Button,
  Form,
  Label,
  Input,
} from "semantic-ui-react";
import {
  addSessions,
  addUser,
  getUserApi,
  sessionsApiClient,
  updateUser,
} from "@/pages/api/apiClient";
import { Activity, SessionInfo, User, sections } from "@/type/type";
import { useEffect, useState } from "react";
import SessionCard from "./SessionCard";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { initUser } from "@/helper/initializer";
import { signOut } from "next-auth/react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type dataContentProps = {
  token: string;
  filterValue: string;
  email: string;
};

export default function dataContent({
  token,
  filterValue,
  email,
}: dataContentProps) {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [user, setUser] = useState<User>(initUser);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    sessionsApiClient(token, setSessions);

    getUserApi(email, setUser);
  }, []);

  let sectionArray: number[] = [];
  let sectionList = new Set<number>();

  sessions?.forEach((session) => {
    return sectionList.add(session.activityType);
  });
  sectionArray = Array.from(sectionList);
  let seriesMap = [];
  for (let i = 0; i < sectionArray?.length; i++)
    seriesMap.push({
      name: sections
        .filter((s) => s.code === sectionArray[i])
        .map((s) => {
          return s.text;
        })
        .toString(),
      data: sessions.filter((s) => s.activityType === sectionArray[i]).length,
      duration: sessions
        .filter((s) => s.activityType === sectionArray[i])
        .map((s) => {
          return parseInt(s.endTimeMillis) - parseInt(s.startTimeMillis);
        })
        .reduce((a, b) => a + b, 0),
    });
  let serieData = [];
  let labelData = [];
  let durationData = [];
  for (let i = 0; i < seriesMap?.length; i++) {
    serieData.push(seriesMap[i].data);
    labelData.push(seriesMap[i].name);
    durationData.push(seriesMap[i].duration / 60000);
  }
  const options: ApexOptions = {
    labels: labelData,
    title: {
      text: "Activity Share by number",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const options1: ApexOptions = {
    title: {
      text: "Activity Duration Chart",
    },
    xaxis: {
      categories: labelData,
    },
  };
  const series = [
    {
      name: "Duration in minutes",
      data: durationData,
    },
  ];

  return (
    <div className="blog-card-container">
      {user.userEmail !== undefined ? (
        <Modal
          animation={false}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button className="teams-modal-btn" color="teal">
              Change your monthly goal
            </Button>
          }
        >
          <Modal.Header>
            Change Your Goal for Activities
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              color="grey"
              floated="right"
            >
              X
            </Button>
          </Modal.Header>
          <Modal.Content>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                updateUser(
                  user.userId,
                  user.userEmail,
                  e,
                  setUser,
                  setOpen,
                  setErrMessage
                );
              }}
            >
              <Form.Field>
                <Label>Nick Name</Label>
                <Input
                  placeholder="Nickname"
                  type="text"
                  name="nickName"
                  pattern="^[A-zÀ-ž\s]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Height</Label>
                <Input
                  placeholder="Height"
                  type="text"
                  name="height"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Weight Goal</Label>
                <Input
                  placeholder="Weigth Goal"
                  type="text"
                  name="weight"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Age</Label>
                <Input
                  placeholder="Age"
                  type="text"
                  name="age"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Sex</Label>
                <Input
                  placeholder="Sex"
                  type="text"
                  name="sex"
                  pattern="^[A-zÀ-ž\s]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Mode</Label>
                <Input
                  placeholder="Mode"
                  type="text"
                  name="mode"
                  pattern="^[A-zÀ-ž\s]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Activity Goal for a Month</Label>
                <Input
                  placeholder="Activity goal for a month"
                  type="text"
                  name="activityGoal"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Duration Goal for a Month</Label>
                <Input
                  placeholder="Duration goal for a month"
                  type="text"
                  name="durationGoal"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Button color="green" type="submit">
                Change your goal +
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
                color="orange"
              >
                Cancel
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      ) : (
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
          <Modal.Header>
            Make Your Goal for Activities
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              color="grey"
              floated="right"
            >
              X
            </Button>
          </Modal.Header>
          <Modal.Content>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                addUser(e, email, setOpen, setUser, setErrMessage);
                if (sessions.length > 0 && user.userEmail !== undefined) {
                  addSessions(sessions, email, setOpen, setErrMessage);
                }
              }}
            >
              <Form.Field>
                <Label>Nick Name</Label>
                <Input
                  placeholder="Nickname"
                  type="text"
                  name="nickName"
                  pattern="^[A-zÀ-ž\s]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Height</Label>
                <Input
                  placeholder="Height"
                  type="text"
                  name="height"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Weight Goal</Label>
                <Input
                  placeholder="Weigth Goal"
                  type="text"
                  name="weight"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Age</Label>
                <Input
                  placeholder="Age"
                  type="text"
                  name="age"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Sex</Label>
                <Input
                  placeholder="Sex"
                  type="text"
                  name="sex"
                  pattern="^[A-zÀ-ž\s]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Mode</Label>
                <Input
                  placeholder="Mode"
                  type="text"
                  name="mode"
                  pattern="^[A-zÀ-ž\s]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Activity Goal for a Month</Label>
                <Input
                  placeholder="Activity goal for a month"
                  type="text"
                  name="activityGoal"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Form.Field>
                <Label>Duration Goal for a Month</Label>
                <Input
                  placeholder="Duration goal for a month"
                  type="text"
                  name="durationGoal"
                  pattern="^[0-9]*$"
                />
              </Form.Field>
              <Button color="green" type="submit">
                Add your goal +
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
                color="orange"
              >
                Cancel
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      )}

      <Button onClick={() => signOut()} type="button" className="">
        Sign Out of Google
      </Button>
      <Chart type="donut" options={options} series={serieData} />
      <Chart type="radar" options={options1} series={series} />
      {sections
        .filter((section) => {
          if (filterValue === "all") {
            return true;
          }
          return section.text === filterValue;
        })
        .map((section) => {
          return (
            <main key={section.code} className="blog-main">
              <div>{user.durationGoal}</div>
              <div>{user.activityGoal}</div>
              <Collapsible
                className="collapse"
                trigger={
                  <Header
                    className="blog-section-header"
                    size="medium"
                    color="teal"
                    block
                  >
                    <Icon name="grab" />
                    <Header.Content>
                      {section.text.toLocaleUpperCase()} | # of {section.text}{" "}
                      for the last 30 days :{" "}
                      {
                        sessions.filter((s) => s.activityType === section.code)
                          .length
                      }
                    </Header.Content>
                    <Popup
                      content="hide/show Sessions"
                      trigger={<Icon name="caret down" />}
                    />
                  </Header>
                }
                open={true}
              >
                <Card.Group className="blog.card.group">
                  {sessions!
                    .filter((s) => s.activityType === section.code)
                    .map((s) => {
                      return (
                        <div key={s.id}>
                          <SessionCard session={s} section={section.text} />
                        </div>
                      );
                    })}
                </Card.Group>
              </Collapsible>
            </main>
          );
        })}
    </div>
  );
}
