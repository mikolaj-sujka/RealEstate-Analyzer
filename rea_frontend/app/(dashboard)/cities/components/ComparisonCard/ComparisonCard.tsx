import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type ComparisonCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const ComparisonCard = ({
  title,
  description,
  children,
}: ComparisonCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
