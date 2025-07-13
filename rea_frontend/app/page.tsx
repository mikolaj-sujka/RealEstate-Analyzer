"use client";

import { DashboardPreview, LandingHeader, LandingHero } from "@/components/LandingPage";
import { Box } from "@mantine/core";

export default function LandingPage() {
  return (
    <Box className="landing-background">
      <div className="landing-overlay" />
      <LandingHeader />
      <main
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LandingHero />
        <DashboardPreview />
      </main>
    </Box>
  );
}
