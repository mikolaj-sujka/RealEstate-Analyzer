import { Text } from "@mantine/core";
type TextDescriptionProps = {
  description: string;
  className?: string;
};

export const TextDescription = ({ description, className }: TextDescriptionProps) => {
  return (
    <Text c="dimmed" size="sm" mb="md" className={className}>
      {description}
    </Text>
  );
};
