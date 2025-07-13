import { Container, Group, Title, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export const LandingHero = () => {
  return (
    <Container
      size="md"
      style={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        zIndex: 5,
        marginTop: "6rem",
      }}
    >
      <Title
        order={1}
        style={{
          color: "white",
          fontSize: "3.2rem",
          marginBottom: "1rem",
          letterSpacing: "-0.05em",
        }}
      >
        Profesjonalna analiza rynku nieruchomości
      </Title>
      <Text
        size="xl"
        style={{
          color: "var(--mantine-color-gray-4)",
          maxWidth: "650px",
          marginBottom: "2.5rem",
          lineHeight: 1.6,
        }}
      >
        Kompleksowe narzędzie do analizy trendów, porównywania cen i
        monitorowania rynku nieruchomości w czasie rzeczywistym.
      </Text>
      <Group>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <Group gap="xs" style={{ cursor: "pointer" }}>
            <Text
              size="lg"
              c="white"
              fw={600}
              style={{
                transition: "color 0.2s ease",
              }}
              className="hover-text-blue"
            >
              Wypróbuj za darmo
            </Text>
            <IconArrowRight size={18} color="white" />
          </Group>
        </Link>
      </Group>
    </Container>
  );
};
