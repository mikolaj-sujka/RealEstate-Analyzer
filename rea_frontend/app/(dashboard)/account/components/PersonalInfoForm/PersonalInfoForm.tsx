import {
  Card,
  TextInput,
  Textarea,
  Stack,
  Grid,
  Text,
} from "@mantine/core";
import { UserProfile } from "../../models";
import { useTranslate } from "@/hooks/useTranslate";

type PersonalInfoFormProps = {
  profile: UserProfile;
  isEditing: boolean;
};

export const PersonalInfoForm = ({
  profile,
  isEditing,
}: PersonalInfoFormProps) => {
  const { t } = useTranslate();
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Text fw={500}>{t("PersonalInfo.informacjeOsobiste")}</Text>
      </Card.Section>
      <Stack mt="md">
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label={t("PersonalInfo.imie")}
              defaultValue={profile.firstName}
              disabled={!isEditing}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label={t("PersonalInfo.nazwisko")}
              defaultValue={profile.lastName}
              disabled={!isEditing}
            />
          </Grid.Col>
        </Grid>
        <TextInput
          label={t("PersonalInfo.email")}
          type="email"
          defaultValue={profile.email}
          disabled={!isEditing}
        />
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label={t("PersonalInfo.numerTelefonu")}
              defaultValue={profile.phone}
              disabled={!isEditing}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label={t("PersonalInfo.firma")}
              defaultValue={profile.company}
              disabled={!isEditing}
            />
          </Grid.Col>
        </Grid>
        <Textarea
          label={t("PersonalInfo.bio")}
          defaultValue={profile.bio}
          disabled={!isEditing}
          rows={3}
        />
      </Stack>
    </Card>
  );
};
