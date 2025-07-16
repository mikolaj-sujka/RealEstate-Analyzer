import { NotificationSettings } from "@/models";
import { Card, Group, Box, Text, Switch, Stack } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";

type NotificationSettingsCardProps = {
  notifications: NotificationSettings;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationSettings>>;
}

export const NotificationSettingsCard = ({
  notifications,
  setNotifications,
}: NotificationSettingsCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group>
          <IconBell size={20} />
          <Text fw={500}>Notification Preferences</Text>
        </Group>
      </Card.Section>
      <Stack mt="md">
        {Object.entries(notifications).map(([key, value]) => (
          <Group key={key} justify="space-between">
            <Box>
              <Text fw={500}>
                {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
              </Text>
              <Text size="sm" c="dimmed">
                Receive {key} notifications
              </Text>
            </Box>
            <Switch
              checked={value as boolean}
              onChange={(e) =>
                setNotifications((prev: any) => ({
                  ...prev,
                  [key]: e.currentTarget.checked,
                }))
              }
            />
          </Group>
        ))}
      </Stack>
    </Card>
  );
}
