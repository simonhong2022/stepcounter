import { SessionInfo, StepInfo } from "@/type/type";
import { Dispatch, SetStateAction } from "react";

const data = [
  {
    dataStreamId:
      "derived:com.google.step_count.delta:407408718192:Example Manufacturer:ExampleTablet:1000001:MyDataSource",
    dataStreamName: "MyDataSource",
    type: "derived",
    dataType: {
      name: "com.google.step_count.delta",
      field: [
        {
          name: "steps",
          format: "integer",
        },
      ],
    },
    device: {
      uid: "1000001",
      type: "tablet",
      version: "1",
      model: "ExampleTablet",
      manufacturer: "Example Manufacturer",
    },
    application: {
      version: "1",
      detailsUrl: "http://example.com",
      name: "Foo Example App",
    },
    dataQualityStandard: [],
  },
];

const endTime = new Date().toJSON();
let d = new Date();
d.setMonth(d.getMonth() - 1);
const startTime = d.toJSON();

//startTime=2023-04-01T00:00:00.000Z&endTime=2023-10-31T23:59:59.999Z
const BASE_SESSION_URL = `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startTime}&endTime=${endTime}`;
const BASE_AGG_URL = `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`;

export async function sessionsApiClient(
  token: string,
  setSessions: Dispatch<SetStateAction<SessionInfo[]>>
) {
  const result = await fetch(BASE_SESSION_URL, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
    mode: "cors",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => setSessions(data.session));
}

export async function createApiClient(
  token: string,
  setDataSources: Dispatch<SetStateAction<StepInfo[]>>
) {
  const reqBody: any = {
    aggregateBy: [
      {
        dataSourceId:
          "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
      },
    ],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: 1696129200000, // new Date().getTime();
    endTimeMillis: 1698962400000,
  };
  const reqOptions = {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body: JSON.stringify(reqBody),
  };
  const result = await fetch(BASE_AGG_URL, reqOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => setDataSources(data.bucket));

  return result;
}
