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
  Segment,
  Grid,
  Divider,
  HeaderSubheader,
} from "semantic-ui-react";
import {
  addSessions,
  addUser,
  getUserApi,
  sessionsApiClient,
  updateUser,
} from "@/pages/api/apiClient";
import { SessionInfo, User, sections } from "@/type/type";
import { useEffect, useState } from "react";
import SessionCard from "./SessionCard";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { initUser } from "@/helper/initializer";
import { signOut } from "next-auth/react";
import { UpdateActivityGoal } from "./UpdateActivityGoal";
import { UpdateDurationGoal } from "./UpdateDurationGoal";
import SectionFilter from "./SectionFilter";
import { SignOut } from "./SignOut";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type dataContentProps = {
  token: string;
  email: string;
};

export default function DataContent({ token, email }: dataContentProps) {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [user, setUser] = useState<User>(initUser);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [filterValue, setFilterValue] = useState("all");
  const filterChanged = (value: string) => {
    setFilterValue(value);
  };

  useEffect(() => {
    sessionsApiClient(token, setSessions).then(() => {
      if (user.userEmail != undefined) getUserApi(email, setUser);
    });
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
    durationData.push(seriesMap[i].duration / 3600000);
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
            width: "50%",
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
      text: `Duration Chart: Total ${durationData.reduce(
        (a, b) => a + b,
        0
      )} hours`,
    },
    xaxis: {
      categories: labelData,
    },
  };
  const series = [
    {
      name: "Duration in hours",
      data: durationData,
    },
  ];

  return (
    <div className="data-content-container">
      <div className="data-content-btns">
        <div className="data-content-btns-signout">
          <SignOut />
        </div>
        {user.userEmail !== undefined ? (
          <div className="data-content-btns-goal-container">
            <Modal
              animation={false}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button
                  size="huge"
                  className="data-content-btns-goal"
                  color="teal"
                >
                  Change your profile
                </Button>
              }
            >
              <Modal.Header>Change Your Goal for Activities</Modal.Header>
              <Modal.Content>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateUser(
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
                      type="number"
                      name="height"
                      pattern="^[0-9]*$"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Label>Weight Goal</Label>
                    <Input
                      placeholder="Weigth Goal"
                      type="number"
                      name="weight"
                      pattern="^[0-9]*$"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Label>Age</Label>
                    <Input
                      placeholder="Age"
                      type="number"
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
                      type="number"
                      name="activityGoal"
                      pattern="^[0-9]*$"
                      required="required"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Label>Duration Goal for a Month</Label>
                    <Input
                      placeholder="Duration goal for a month"
                      type="number"
                      name="durationGoal"
                      pattern="^[0-9]*$"
                      required="required"
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
          </div>
        ) : (
          <div className="data-content-btns-goal-container">
            <Modal
              animation={false}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button
                  size="massive"
                  className="data-content-btns-goal"
                  color="orange"
                >
                  Let's get started! <Icon name="mouse pointer" />
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
                    addUser(e, email, setOpen, setUser, setErrMessage).then(
                      () => addSessions(sessions, email, setOpen, setErrMessage)
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
                      type="number"
                      name="height"
                      pattern="^[0-9]*$"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Label>Weight Goal</Label>
                    <Input
                      placeholder="Weigth Goal"
                      type="number"
                      name="weight"
                      pattern="^[0-9]*$"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Label>Age</Label>
                    <Input
                      placeholder="Age"
                      type="number"
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
                      type="number"
                      name="activityGoal"
                      pattern="^[0-9]*$"
                      required="required"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Label>Duration Goal for a Month</Label>
                    <Input
                      placeholder="Duration goal for a month"
                      type="number"
                      name="durationGoal"
                      pattern="^[0-9]*$"
                      required="required"
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
          </div>
        )}
      </div>

      {user.userEmail != undefined ? (
        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>And</Divider>
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                {user.activityGoal && sessions.length >= user.activityGoal ? (
                  <Header icon>
                    <Icon color="green" name="check" />
                    Activity Completed!
                    <Header.Subheader>
                      {" "}
                      You reached your <strong>activity</strong> goal. Keep it
                      up.
                    </Header.Subheader>
                    <Header.Subheader>
                      Your Goal: {user.activityGoal}
                    </Header.Subheader>
                    <Header.Subheader>
                      Current Activities: {sessions.length}
                    </Header.Subheader>
                    <HeaderSubheader>
                      <UpdateActivityGoal email={email} setUser={setUser} />
                    </HeaderSubheader>
                  </Header>
                ) : (
                  <Header icon>
                    <Icon color="red" name="minus" />
                    Let's try more activities!
                    <Header.Subheader>
                      You need{" "}
                      <strong>
                        <big>{user.activityGoal! - sessions.length}</big>
                      </strong>{" "}
                      more <strong>activities</strong> to reach your goal. Keep
                      push!{" "}
                    </Header.Subheader>
                    <Header.Subheader>
                      Your Goal: {user.activityGoal}
                    </Header.Subheader>
                    <Header.Subheader>
                      Current Activities: {sessions.length}
                    </Header.Subheader>
                    <HeaderSubheader>
                      <UpdateActivityGoal email={email} setUser={setUser} />
                    </HeaderSubheader>
                  </Header>
                )}
              </Grid.Column>
              <Grid.Column>
                {user.durationGoal &&
                durationData.reduce((a, b) => a + b, 0) >= user.durationGoal ? (
                  <Header icon>
                    <Icon color="green" name="check" />
                    Duration Completed!
                    <Header.Subheader>
                      {" "}
                      You reached your <strong>duration</strong> goal. Keep it
                      up.
                    </Header.Subheader>
                    <Header.Subheader>
                      Your Goal: {user.durationGoal} hours
                    </Header.Subheader>
                    <Header.Subheader>
                      Current Duration Total:{" "}
                      {durationData.reduce((a, b) => a + b, 0)} hours
                    </Header.Subheader>
                    <HeaderSubheader>
                      <UpdateDurationGoal email={email} setUser={setUser} />
                    </HeaderSubheader>
                  </Header>
                ) : (
                  <Header icon>
                    <Icon color="red" name="minus" />
                    Let's try more duration!
                    <Header.Subheader>
                      You need{" "}
                      <strong>
                        {user.durationGoal! -
                          durationData.reduce((a, b) => a + b, 0)}{" "}
                      </strong>
                      hours more <strong>duration</strong> to reach your goal.
                      Keep push!
                    </Header.Subheader>
                    <Header.Subheader>
                      Your Goal: {user.durationGoal} hours
                    </Header.Subheader>
                    <Header.Subheader>
                      Current Duration Total:{" "}
                      {durationData.reduce((a, b) => a + b, 0)} hours
                    </Header.Subheader>
                    <HeaderSubheader>
                      <UpdateDurationGoal email={email} setUser={setUser} />
                    </HeaderSubheader>
                  </Header>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      ) : null}
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Chart type="donut" options={options} series={serieData} />
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Chart type="radar" options={options1} series={series} />
          </Grid.Column>
        </Grid>

        <Divider vertical>AND</Divider>
      </Segment>
      <div className="data-content-header-h2">
        <Header as="h2" icon="list" content="Session Details" />
      </div>
      <SectionFilter filterChanged={filterChanged} />
      {sections
        .filter((section) => {
          if (filterValue === "all") {
            return true;
          }
          return section.text === filterValue;
        })
        .map((section) => {
          return (
            <div key={section.code} className="sessions-body">
              <Collapsible
                className="collapse"
                trigger={
                  <Header
                    className="sessions-header"
                    size="large"
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
                <Card.Group className="session-card-group">
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
            </div>
          );
        })}
    </div>
  );
}
