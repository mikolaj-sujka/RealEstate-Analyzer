"use client";

import { Box, Text, Progress, Group, Paper, Center } from "@mantine/core";
import Image from "next/image";
import { usePageLoader } from "./hooks";
import * as styles from "./styles/pageLoaderStyles.css";

export const PageLoader = () => {
  const { progress, loadingText } = usePageLoader();

  return (
    <Box className={styles.root}>
      <Center className={styles.center}>
        <Box className={styles.wrapper}>
          <Box className={styles.logoContainer}>
            <Box className={styles.pingEffect} />
            <Paper
              shadow="xl"
              radius="xl"
              p="md"
              style={{
                position: "relative",
                zIndex: 10,
                backgroundColor: "white",
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={64}
                height={64}
                className={styles.logo}
              />
            </Paper>
          </Box>

          <Box className={styles.content}>
            <Progress
              value={Math.min(progress, 100)}
              size="lg"
              radius="xl"
              className={styles.progressBar}
            />

            <Box className={styles.textContainer}>
              <Text className={styles.title}>Real Estate Analyzer</Text>
              <Text className={styles.loadingText}>{loadingText}</Text>
              <Text className={styles.percentageText}>
                {Math.round(progress)}% załadowane
              </Text>
            </Box>
          </Box>

          <Group className={styles.dotsContainer}>
            {[0, 1, 2].map((i) => (
              <Box key={i} className={styles.dot} />
            ))}
          </Group>
        </Box>
      </Center>
    </Box>
  );
};
