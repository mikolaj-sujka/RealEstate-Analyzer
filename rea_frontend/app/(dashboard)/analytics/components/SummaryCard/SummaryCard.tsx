// src/features/analytics/components/SummaryCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type SummaryCardProps = {
  title: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  Icon: LucideIcon;
};

export const SummaryCard = ({
  title,
  value,
  delta,
  deltaPositive,
  Icon,
}: SummaryCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs flex items-center ${
            deltaPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {deltaPositive ? (
            <span className="mr-1">▲</span>
          ) : (
            <span className="mr-1">▼</span>
          )}
          {delta} from last month
        </p>
      </CardContent>
    </Card>
  );
};
