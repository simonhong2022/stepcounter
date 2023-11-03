import { DataSet, StepInfo } from "@/type/type";

type pointTableProps = {
  dataSet: DataSet;
};

export default function pointTable({ dataSet }: pointTableProps) {
  return <div>{dataSet.point}</div>;
}
