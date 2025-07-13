import { Group, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

export const LandingHeader = () => {
  return (
    <header
      style={{
        padding: "1.5rem 4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <Group>
        <Image
          src="images/logo.png"
          alt="Real Estate Analyzer Logo"
          width={60}
          height={60}
        />
        <Text fw={700} size="lg" c="white">
          Real Estate Analyzer
        </Text>
      </Group>
      <Group>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <Text
            c="rgba(255,255,255,0.8)"
            style={{
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            className="hover-text-white"
          >
            Zaloguj się
          </Text>
        </Link>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <Group gap="xs" style={{ cursor: "pointer" }}>
            <Text
              c="white"
              fw={500}
              style={{
                transition: "color 0.2s ease",
              }}
              className="hover-text-blue"
            >
              Zacznij korzystać
            </Text>
            <IconArrowRight size={16} color="white" />
          </Group>
        </Link>
      </Group>
    </header>
  );
};
