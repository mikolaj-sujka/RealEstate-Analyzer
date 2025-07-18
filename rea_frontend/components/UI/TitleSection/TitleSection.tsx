import { Title } from "@mantine/core";

type TitleSectionProps = {
  title: string;
};

export const TitleSection = ({ title }: TitleSectionProps) => {
  return (
    <Title order={3}>
      {title}
    </Title>
  );
};