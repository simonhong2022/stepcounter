import Collapsible from "react-collapsible";
import { Header, Card, Icon, Popup } from "semantic-ui-react";
import { createApiClient, sessionsApiClient } from "@/pages/api/apiClient";
import { SessionInfo, StepInfo, sections } from "@/type/type";
import { useEffect, useState } from "react";
import SessionCard from "./SessionCard";

type dataContentProps = {
  token: string;
  filterValue: string;
};

export default function dataContent({ token, filterValue }: dataContentProps) {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  useEffect(() => {
    sessionsApiClient(token, setSessions);
  }, []);
  let sectionArray: number[] = [];
  let sectionList = new Set<number>();

  sessions?.forEach((session) => {
    return sectionList.add(session.activityType);
  });
  sectionArray = Array.from(sectionList);

  return (
    <div className="blog-card-container">
      {sections!
        .filter((section) => {
          if (filterValue === "all") {
            return true;
          }
          return section.text === filterValue;
        })
        .map((section) => {
          return (
            <main key={section.code} className="blog-main">
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
                      content="hide/show blogs"
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
                      return <SessionCard session={s} section={section.text} />;
                    })}
                </Card.Group>
              </Collapsible>
            </main>
          );
        })}
    </div>
  );
}
