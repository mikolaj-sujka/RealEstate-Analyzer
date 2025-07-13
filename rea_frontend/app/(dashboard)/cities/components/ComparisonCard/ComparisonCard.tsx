import { Card } from "@mantine/core";

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
        {title}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      {children}
    </Card>
  );
}
