import { TitleSection } from "@/components/UI";
import { Title, Text } from "@mantine/core";

type HelpHeaderProps = {
    translate: (key: string) => string;
};

export const HelpHeader = ({ translate }: HelpHeaderProps) => {
  return (
    <div>
      <TitleSection title={translate("HelpCenter.centrumPomocy")} />
      <Text c="dimmed" size="md">
        {translate("HelpCenter.pomocOpis")}
      </Text>
    </div>
  );
};
