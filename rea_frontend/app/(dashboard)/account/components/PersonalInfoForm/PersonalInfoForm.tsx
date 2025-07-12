import {
  Card,
  TextInput,
  Textarea,
  Stack,
  Grid,
  Text,
} from "@mantine/core";
import { UserProfile } from "../../models";

type PersonalInfoFormProps = {
  profile: UserProfile;
  isEditing: boolean;
};

export const PersonalInfoForm = ({
  profile,
  isEditing,
}: PersonalInfoFormProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Text fw={500}>Personal Information</Text>
      </Card.Section>
      <Stack mt="md">
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="First Name"
              defaultValue={profile.firstName}
              disabled={!isEditing}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Last Name"
              defaultValue={profile.lastName}
              disabled={!isEditing}
            />
          </Grid.Col>
        </Grid>
        <TextInput
          label="Email Address"
          type="email"
          defaultValue={profile.email}
          disabled={!isEditing}
        />
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Phone Number"
              defaultValue={profile.phone}
              disabled={!isEditing}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Company"
              defaultValue={profile.company}
              disabled={!isEditing}
            />
          </Grid.Col>
        </Grid>
        <Textarea
          label="Bio"
          defaultValue={profile.bio}
          disabled={!isEditing}
          rows={3}
        />
      </Stack>
    </Card>
  );
};
