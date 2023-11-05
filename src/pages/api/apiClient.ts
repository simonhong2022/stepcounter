import {
  Activity,
  ActivityDTO,
  SessionInfo,
  StepInfo,
  User,
  UserDTO,
} from "@/type/type";
import { signOut } from "next-auth/react";
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

// from Google Fit APIs

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
  });
  if (result.status !== 200) {
    signOut();
  }
  return await result.json().then((data) => setSessions(data.session));
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

// API calls from User
const BASE_USER_URL = "http://localhost:8080/api/users";
export async function getUserApi(
  email: string | string[],
  setUser: Dispatch<SetStateAction<User>>
) {
  const userURL = BASE_USER_URL + `/${email}`;
  return await fetch(userURL)
    .then((res) => res.json())
    .then((data) => setUser(data));
}

export async function addUser(
  event: React.FormEvent<HTMLFormElement>,
  email: string,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setUser: Dispatch<SetStateAction<User>>,
  setErrMessage: Dispatch<SetStateAction<string>>
) {
  const reqBody: UserDTO = {
    userName: event.currentTarget.nickName.value,
    userEmail: email,
    height: event.currentTarget.height.value,
    expectedWeight: event.currentTarget.weight.value,
    age: event.currentTarget.age.value,
    sex: event.currentTarget.sex.value,
    mode: event.currentTarget.mode.value,
    activityGoal: event.currentTarget.activityGoal.value,
    durationGoal: event.currentTarget.durationGoal.value,
    recommendations: [],
  };

  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  };
  const response = await fetch(BASE_USER_URL, reqOptions);

  if (response.ok) {
    await getUserApi(email, setUser);
    setOpen(false);
    setErrMessage("");
  } else {
    setErrMessage("User already exist.");
  }
}

export async function updateUser(
  email: string,
  event: React.FormEvent<HTMLFormElement>,
  setUser: Dispatch<SetStateAction<User>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setErrMessage: Dispatch<SetStateAction<string>>
) {
  const reqBody: UserDTO = {
    userName: event.currentTarget.nickName.value,
    userEmail: email,
    height: event.currentTarget.height.value,
    expectedWeight: event.currentTarget.weight.value,
    age: event.currentTarget.age.value,
    sex: event.currentTarget.sex.value,
    mode: event.currentTarget.mode.value,
    activityGoal: event.currentTarget.activityGoal.value,
    durationGoal: event.currentTarget.durationGoal.value,
    recommendations: [],
  };

  const reqOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  };
  const response = await fetch(BASE_USER_URL + "/" + `${email}`, reqOptions);

  if (response.ok) {
    await getUserApi(email, setUser);
    setOpen(false);
    setErrMessage("");
  } else {
    setErrMessage("User already exist.");
  }
}

export async function updateUserActivityGoal(
  email: string,
  event: React.FormEvent<HTMLFormElement>,
  setUser: Dispatch<SetStateAction<User>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setErrMessage: Dispatch<SetStateAction<string>>
) {
  const reqBody = {
    activityGoal: event.currentTarget.activityGoal.value,
  };

  const reqOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  };
  const response = await fetch(BASE_USER_URL + "/" + `${email}`, reqOptions);

  if (response.ok) {
    await getUserApi(email, setUser);
    setOpen(false);
    setErrMessage("");
  } else {
    setErrMessage("User already exist.");
  }
}

export async function updateUserDurationGoal(
  email: string,
  event: React.FormEvent<HTMLFormElement>,
  setUser: Dispatch<SetStateAction<User>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setErrMessage: Dispatch<SetStateAction<string>>
) {
  const reqBody = {
    durationGoal: event.currentTarget.durationGoal.value,
  };

  const reqOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  };
  const response = await fetch(BASE_USER_URL + "/" + `${email}`, reqOptions);

  if (response.ok) {
    await getUserApi(email, setUser);
    setOpen(false);
    setErrMessage("");
  } else {
    setErrMessage("User already exist.");
  }
}

// session api
const BASE_ACTIVITY_URL = "http://localhost:8080/api/sessions";
export async function addSessions(
  sessions: SessionInfo[],
  email: string,
  setOpen: Dispatch<SetStateAction<boolean>>,
  //setActivities: Dispatch<SetStateAction<Activity[]>>,
  setErrMessage: Dispatch<SetStateAction<string>>
) {
  for (let i = 0; i < sessions.length; i++) {
    const reqBody: ActivityDTO = {
      activity: sessions[i].name,
      activityType: sessions[i].activityType,
      description: sessions[i].description,
      startTime: sessions[i].startTimeMillis,
      endTime: sessions[i].endTimeMillis,
      caloreiConsumed: null,
      avgHearRate: null,
      email: email,
    };
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    };
    const response = await fetch(BASE_ACTIVITY_URL, reqOptions);
    if (response.ok) {
      //await getUserApi(email, setUser);
      setOpen(false);
      setErrMessage("");
    } else {
      setErrMessage("Activity already exist.");
    }
  }
}

export async function addSession(
  session: SessionInfo,
  email: string,
  setOpen: Dispatch<SetStateAction<boolean>>,
  //setActivities: Dispatch<SetStateAction<Activity[]>>,
  setErrMessage: Dispatch<SetStateAction<string>>
) {
  const reqBody: ActivityDTO = {
    activity: session.name,
    activityType: session.activityType,
    description: session.description,
    startTime: session.startTimeMillis,
    endTime: session.endTimeMillis,
    caloreiConsumed: null,
    avgHearRate: null,
    email: email,
  };
  const reqOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  };
  const response = await fetch(BASE_ACTIVITY_URL, reqOptions);
  if (response.ok) {
    //await getUserApi(email, setUser);
    setOpen(false);
    setErrMessage("");
  } else {
    setErrMessage("Activity already exist.");
  }
}
