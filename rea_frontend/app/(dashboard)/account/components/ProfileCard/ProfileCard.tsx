import {
  Card,
  Title,
  Text,
  Badge,
  Avatar,
  ActionIcon,
  Divider,
  Group,
  Stack,
  Box,
} from "@mantine/core";
import {
  IconUser,
  IconShield,
  IconUpload,
  IconCalendar,
  IconBuilding,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import { UserProfile } from "../../models";
import { useTranslate } from "@/hooks/useTranslate";

type ProfileCardProps = {
  profile: UserProfile;
  isEditing: boolean;
};

export const ProfileCard = ({ profile, isEditing }: ProfileCardProps) => {
  const { t } = useTranslate();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group>
          <IconUser size={20} />
          <Text fw={500}>{t("ProfileCard.ogólneInformacje")}</Text>
        </Group>
      </Card.Section>
      <Stack align="center" mt="md">
        <Box pos="relative">
          <Avatar src="/images/profile.png" size={100} radius="xl" />
          {isEditing && (
            <ActionIcon
              variant="filled"
              radius="xl"
              size="sm"
              style={{ position: "absolute", bottom: -8, right: -8 }}
            >
              <IconUpload size={12} />
            </ActionIcon>
          )}
        </Box>
        <Stack align="center" gap="xs">
          <Title order={3}>
            {profile.firstName} {profile.lastName}
          </Title>
          <Text c="dimmed">{t("ProfileCard.realEstateAnalyst")}</Text>
          <Badge variant="light" leftSection={<IconShield size={12} />}>
            {t("ProfileCard.premiumUzytkownik")}
          </Badge>
        </Stack>
      </Stack>
      <Divider my="md" />
      <Stack gap="sm">
        <Group gap="sm">
          <IconMail size={16} color="var(--mantine-color-dimmed)" />
          <Text size="sm">{profile.email}</Text>
        </Group>
        <Group gap="sm">
          <IconPhone size={16} color="var(--mantine-color-dimmed)" />
          <Text size="sm">{profile.phone}</Text>
        </Group>
        <Group gap="sm">
          <IconBuilding size={16} color="var(--mantine-color-dimmed)" />
          <Text size="sm">{profile.company}</Text>
        </Group>
        <Group gap="sm">
          <IconCalendar size={16} color="var(--mantine-color-dimmed)" />
          <Text size="sm">
            {t("ProfileCard.uzytkownikOd")} {new Date(profile.joined).toLocaleString()}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
};
