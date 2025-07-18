import React from "react";
import { Container, Paper } from "@mantine/core";

export const DashboardSection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container size="xl" py="xl">
      {" "}
      <Paper shadow="sm" p="lg" radius="md" withBorder mb="xl">
        {children}
      </Paper>
    </Container>
  );
};
