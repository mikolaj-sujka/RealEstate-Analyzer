"use client";
import { Container, Grid, Flex, Title, Button } from "@mantine/core";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { ProfileCard } from "./components/ProfileCard";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { NotificationSettingsCard } from "./components/NotificationSettings";
import { useAccountPage } from "./_hooks/useAccountPage";

export const AccountPage = () => {
  const { profile, notifications, isEditing, toggleEdit, setNotifications } =
    useAccountPage();

  if (!profile) return <p>Loading…</p>;

  return (
    <Container size="xl" py="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={1}>My Account</Title>
        <Button
          onClick={toggleEdit}
          variant={isEditing ? "outline" : "filled"}
          leftSection={
            isEditing ? <IconDeviceFloppy size={16} /> : <IconEdit size={16} />
          }
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </Flex>
      <Grid>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <ProfileCard profile={profile} isEditing={isEditing} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <PersonalInfoForm profile={profile} isEditing={isEditing} />
          <NotificationSettingsCard
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default AccountPage;