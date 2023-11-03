export type StepInfo = {
  startTimeMillis: string;
  endTimeMillis: string;
  dataset: DataSet[];
};

export type DataSet = {
  dataSourceId: string;
  point: [];
};

export type SessionInfo = {
  modifiedTimeMillis: string;
  endTimeMillis: string;
  description: string;
  activityType: number;
  application: [];
  startTimeMillis: string;
  id: string;
  name: string;
};

export interface ISections {
  value: string;
  text: string;
  code: number | null;
}

export const all: ISections[] = [
  {
    value: "all",
    text: "all",
    code: null,
  },
];

export const sections: ISections[] = [
  {
    value: "hiking",
    text: "hiking",
    code: 35,
  },
  {
    value: "meditation",
    text: "meditation",
    code: 45,
  },
  {
    value: "squash",
    text: "squash",
    code: 76,
  },
  {
    value: "strength",
    text: "strength training",
    code: 80,
  },
  {
    value: "walking",
    text: "walking",
    code: 7,
  },
  {
    value: "running",
    text: "running",
    code: 8,
  },
];
