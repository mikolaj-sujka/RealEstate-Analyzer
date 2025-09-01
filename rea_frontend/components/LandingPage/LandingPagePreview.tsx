import React from "react";
import { Title, Text, Button, Group } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import * as classes from "./styles";
import { BeamsBackground } from "./components";
import { useTranslate } from "@/hooks";
import { useLandingPage } from "./hooks";
import { LANDING_PAGE_FEATURES } from "./models";

export const LandingPagePreview: React.FC = () => {
  const { t } = useTranslate();
  const { loading, handleClick } = useLandingPage();
  return (
    <BeamsBackground intensity={1} beams={90} quality="auto">
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
            loading={loading}
            onClick={handleClick}
          >
            {t("LandingPagePreview.rozpocznijAnalizę")}
          </Button>
        </Group>

        <Group className={classes.titleGroup}>
          {LANDING_PAGE_FEATURES.map(({ Icon, label, sub }, idx) => (
            <div
              key={label}
              className={`${classes.fadeInUp} ${
                (classes as Record<string, string>)[`fadeInDelay${idx + 1}`]
              }`}
            >
              <Icon className={classes.iconLanding} />
              <Text className={classes.textFeatureLanding}>{label}</Text>
              <Text className={classes.textFreatureLandingSub}>{sub}</Text>
            </div>
          ))}
        </Group>
      </div>
    </BeamsBackground>
  );
};
