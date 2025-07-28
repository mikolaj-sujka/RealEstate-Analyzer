"use client";

import { useEffect, useState } from "react";
import { Box, Text, Progress, Group, Paper, Center } from "@mantine/core";
import Image from "next/image";

export const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Inicjalizacja...");

  useEffect(() => {
    const texts = [
      "Inicjalizacja...",
      "Ładowanie danych rynkowych...",
      "Analiza trendów...",
      "Przygotowywanie wykresów...",
      "Już prawie gotowe...",
    ];

    let textIndex = 0;
    const textTimer = setInterval(() => {
      setLoadingText(texts[textIndex]);
      textIndex = (textIndex + 1) % texts.length;
    }, 400);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          clearInterval(textTimer);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 120);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <Box
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background:
          "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #faf5ff 100%)",
      }}
    >
      <Center h="100vh">
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
          }}
        >
          <Box style={{ position: "relative" }}>
            <Box
              style={{
                position: "absolute",
                inset: -16,
                borderRadius: "50%",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
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
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
            </Paper>
          </Box>

          <Box
            w={320}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <Progress
              value={Math.min(progress, 100)}
              size="lg"
              radius="xl"
              style={{
                "& .mantineProgressBar": {
                  background:
                    "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                },
              }}
            />

            <Box
              ta="center"
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <Text size="lg" fw={600} c="dark.8">
                Real Estate Analyzer
              </Text>
              <Text
                size="sm"
                c="dimmed"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              >
                {loadingText}
              </Text>
              <Text size="xs" c="dimmed">
                {Math.round(progress)}% Complete
              </Text>
            </Box>
          </Box>

          <Group gap="xs">
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                w={8}
                h={8}
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#3b82f6",
                  animation: `bounce 1s infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </Group>
        </Box>
      </Center>

      <style jsx>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes pulse {
          50% {
            opacity: 0.5;
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: none;
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `}</style>
    </Box>
  );
};
