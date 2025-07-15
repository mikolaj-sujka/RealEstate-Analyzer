"use client";

import { AppShell, Paper } from "@mantine/core";
import { PageLoader } from "@/components/PageLoader";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { usePageLoader } from "@/hooks";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const isLoading = usePageLoader(1500);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 280, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        {/* <Paper p="md" radius="md" bg="var(--mantine-color-body)"> */}
          {children}
        {/* </Paper> */}
      </AppShell.Main>
    </AppShell>
  );
}
