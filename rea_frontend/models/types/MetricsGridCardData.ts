import { IconType } from "react-icons";

export type MetricGridCardData = {
  label: string;
  value: string;
  change: string;
  changeColor: string;
  icon: IconType;
  sparklineData: { value: number }[];
  sparklineColor: string;
};