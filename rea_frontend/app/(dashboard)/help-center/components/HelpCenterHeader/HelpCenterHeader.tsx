import { TextDescription, TitleSection } from "@/components/UI";

type HelpHeaderProps = {
    translate: (key: string) => string;
};

export const HelpHeader = ({ translate }: HelpHeaderProps) => {
  return (
    <div>
      <TitleSection title={translate("HelpCenter.centrumPomocy")} />
      <TextDescription description={translate("HelpCenter.pomocOpis")} />
    </div>
  );
};
