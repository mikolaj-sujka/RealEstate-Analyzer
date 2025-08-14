"use client";
import {
  Center,
  Stack,
  Title,
  Text,
  ThemeIcon,
  Paper,
  Group,
} from "@mantine/core";
import { IconDatabaseOff } from "@tabler/icons-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  height?: number | string;
  iconSize?: number;
  children?: React.ReactNode; 
};

export const EmptyState =({
  title = "Brak danych",
  description = "Nie znaleziono danych do wyświetlenia dla wybranego zakresu.",
  height = "50vh",
  iconSize = 56,
  children,
}: EmptyStateProps) => {
  return (
    <Paper p="xl" mt="md" radius="lg" withBorder>
      <Center h={height}>
        <Stack align="center" gap="sm">
          <ThemeIcon size={72} radius="xl" variant="light">
            <IconDatabaseOff size={iconSize} />
          </ThemeIcon>

          <Title order={3} ta="center">
            {title}
          </Title>
          <Text c="dimmed" ta="center">
            {description}
          </Text>

          {children ? <Group>{children}</Group> : null}
        </Stack>
      </Center>
    </Paper>
  );
}
