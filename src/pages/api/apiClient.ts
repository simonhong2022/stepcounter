import { Bucket } from "@/type/type";
import axios from "axios";
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

const BASE_AGG_URL = `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`;
let stepArray = [];

/* export const createApiClient = (token: string) => {
  return {
    getDataSources: async () => {
      try {
        const response = await axios({
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        return response.data;
      } catch (e) {
        console.log(e);
      }
    },
  };
}; */

export async function createApiClient(
  token: string,
  setDataSources: Dispatch<SetStateAction<Bucket[]>>
) {
  const reqBody: any = {
    aggregateBy: [
      {
        dataSourceId:
          "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
      },
    ],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: 1454284800000,
    endTimeMillis: 1455062400000,
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
