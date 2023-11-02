export type Bucket = {
  startTimeMillis: string;
  endTimeMillis: string;
  dataSet: DataSet;
};

export type DataSet = {
  dataSourceId: string;
  point: [];
};
