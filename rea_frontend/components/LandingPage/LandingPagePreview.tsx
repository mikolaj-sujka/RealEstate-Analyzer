import React from "react";
import { Title, Text, Button, Group, rem } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { IconChartLine, IconMap, IconCalculator } from "@tabler/icons-react";
import * as classes from "./styles";
import { BeamsBackground } from "./components";
import { useTranslate } from "@/hooks";

export const LandingPagePreview: React.FC = () => {
  const { t } = useTranslate();
  return (
    <BeamsBackground intensity={1}>
      <div className={classes.container}>
        <Image
          src="/images/logo.png"
          alt="Real Estate Analyzer Logo"
          height={140}
          width={140}
          className={`${classes.imageLanding} ${classes.fadeInUp} ${classes.fadeInDelay1}`}
        />

        <Title
          className={`${classes.fadeInUp} ${classes.fadeInDelay1} ${classes.titleLanding}`}
        >
          {t("LandingPagePreview.profesjonalnaAnaliza")}
          <br />
          <Text className={classes.titleTextGradient}>
            {t("LandingPagePreview.rynkuNieruchomości")}
          </Text>
        </Title>

        <Text
          className={`${classes.fadeInUp} ${classes.fadeInDelay1}`}
          style={{ animationDelay: "0.2s" }}
        >
          {t("LandingPagePreview.inteligentneNarzędzie")}
        </Text>

        <Group
          mt="xl"
          className={`${classes.fadeInUp} ${classes.fadeInDelay1}`}
        >
          <Button
            component={Link}
            href="/dashboard"
            className={classes.landingButton}
          >
            {t("LandingPagePreview.rozpocznijAnalizę")}
          </Button>
        </Group>

        <Group mt="xl" className={classes.fadeInDelay3} gap="xl">
          {[
            {
              Icon: IconChartLine,
              label: "24/7 Dostępność",
              sub: "Analizuj kiedy chcesz",
            },
            {
              Icon: IconMap,
              label: "Mapa nieruchomości",
              sub: "Wizualizuj dane",
            },
            {
              Icon: IconCalculator,
              label: "Kalkulator inwestycyjny",
              sub: "Oszacuj zyski",
            },
          ].map(({ Icon, label, sub }, i) => (
            <div
              key={label}
              className={`${classes.fadeInUp} ${classes.fadeInDelay3}`}
            >
              <Icon size={rem(48)} style={{ color: "#93c5fd" }} />
              <Text size="lg" fw={700} mt="sm">
                {label}
              </Text>
              <Text size="sm" c="gray.4">
                {sub}
              </Text>
            </div>
          ))}
        </Group>
      </div>
    </BeamsBackground>
  );
};
