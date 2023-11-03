"use client";
import Collapsible from "react-collapsible";
import { Header, Card, Icon, Popup } from "semantic-ui-react";
import { sessionsApiClient } from "@/pages/api/apiClient";
import { SessionInfo, sections } from "@/type/type";
import { useEffect, useState } from "react";
import SessionCard from "./SessionCard";
import dynamic from "next/dynamic";
import { options } from "@/helper/method";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
    durationData.push(seriesMap[i].duration);
  }
  console.log(durationData);
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
      name: "rent",
      data: durationData,
    },
  ];

  return (
    <div className="blog-card-container">
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
