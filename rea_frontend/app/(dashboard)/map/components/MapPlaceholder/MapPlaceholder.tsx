"use client";

import { Paper, Text, Box, Center, Stack } from "@mantine/core";
import { IconMap } from "@tabler/icons-react";

export const MapPlaceholder = () => {
  return (
    <Paper shadow="sm" radius="md" withBorder>
      <Box p="lg">
        <Text fw={600} size="lg" mb="md">
          Interactive Map Placeholder
        </Text>
      </Box>

      <Box
        p="lg"
        h={384}
        style={{
          backgroundColor: "var(--mantine-color-gray-1)",
          borderRadius: "var(--mantine-radius-md)",
          margin: "0 1rem 1rem 1rem",
        }}
      >
        <Center h="100%">
          <Stack align="center" gap="md">
            <IconMap size={64} color="var(--mantine-color-gray-6)" />
            <Text c="dimmed" ta="center">
              Interactive map would be displayed here
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Integration with Google Maps or Mapbox
            </Text>
          </Stack>
        </Center>
      </Box>
    </Paper>
  );
};
