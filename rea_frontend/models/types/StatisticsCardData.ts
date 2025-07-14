import { ReactElement } from "react";

export type StatisticsCardData = {
    label: string;
    value: string;
    change: { percentage: number; isPositive: boolean };
    icon: ReactElement;
}