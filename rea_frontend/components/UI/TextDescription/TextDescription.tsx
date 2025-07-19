import { Text } from "@mantine/core";
type TextDescriptionProps = {
  description: string;
};

export const TextDescription = ({ description }: TextDescriptionProps) => {
  return (
    <Text c="dimmed" size="sm" mb="md">
      {description}
    </Text>
  );
};
