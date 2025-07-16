"use client";
import { Container, Grid, Flex, Title, Button } from "@mantine/core";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { useAccountPage } from "./hooks";
import {
  PersonalInfoForm,
  ProfileCard,
} from "./components";
import * as classes from "./styles";
import { useTranslate } from "@/hooks";

export const AccountPage = () => {
  const { profile, notifications, isEditing, toggleEdit, setNotifications } =
    useAccountPage();
    
  const { t } = useTranslate();

  if (!profile) return <p>Loading…</p>;

  return (
    <Container className={classes.container}>
      <Flex className={classes.header}>
        <Title order={1}>{t("Account.mojeKonto")}</Title>
        <Button
          onClick={toggleEdit}
          variant={isEditing ? "outline" : "filled"}
          leftSection={
            isEditing ? <IconDeviceFloppy size={16} /> : <IconEdit size={16} />
          }
        >
          {isEditing ? t("Account.zapiszZmiany") : t("Account.edytujProfil")}
        </Button>
      </Flex>
      <Grid className={classes.grid}>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <ProfileCard profile={profile} isEditing={isEditing} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <PersonalInfoForm profile={profile} isEditing={isEditing} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AccountPage;
