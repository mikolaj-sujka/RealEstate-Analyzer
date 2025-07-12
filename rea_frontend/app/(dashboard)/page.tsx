"use client";

import { Container, Grid, Paper, Text, Group, Title, Box } from "@mantine/core";
import {
  IconArrowUpRight,
  IconHome,
  IconCurrencyDollar,
  IconUsers,
} from "@tabler/icons-react";
import {
  priceData,
  recentTransactions,
  tableColumns,
  transactionsSparkline,
} from "./models/consts/dashboard.consts";
import Sparkline from "@/components/Sparkline/Sparkline";
import { Chart } from "@/components/Chart";
import { DataTable } from "@/components/DataTable";

export default function DashboardPage() {
  return (
    <Container fluid>
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Transakcje
              </Text>
              <IconArrowUpRight
                size={16}
                color="var(--mantine-color-green-6)"
              />
            </Group>
            <Text size="xl" fw={700}>
              1,748
            </Text>
            <Text size="xs" c="green">
              +5.2%
            </Text>
            <Box h={40} mt="sm">
              <Sparkline
                data={transactionsSparkline}
                color="var(--mantine-color-green-6)"
              />
            </Box>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Średnia Cena
              </Text>
              <IconCurrencyDollar
                size={16}
                color="var(--mantine-color-blue-6)"
              />
            </Group>
            <Text size="xl" fw={700}>
              8,450 PLN/m²
            </Text>
            <Text size="xs" c="green">
              +2.1%
            </Text>
            <Box h={40} mt="sm">
              <Sparkline
                data={[
                  { value: 4 },
                  { value: 6 },
                  { value: 8 },
                  { value: 7 },
                  { value: 9 },
                  { value: 8 },
                  { value: 10 },
                ]}
                color="var(--mantine-color-blue-6)"
              />
            </Box>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Nowe Oferty
              </Text>
              <IconHome size={16} color="var(--mantine-color-orange-6)" />
            </Group>
            <Text size="xl" fw={700}>
              342
            </Text>
            <Text size="xs" c="red">
              -1.3%
            </Text>
            <Box h={40} mt="sm">
              <Sparkline
                data={[
                  { value: 8 },
                  { value: 6 },
                  { value: 7 },
                  { value: 5 },
                  { value: 4 },
                  { value: 6 },
                  { value: 5 },
                ]}
                color="var(--mantine-color-orange-6)"
              />
            </Box>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Aktywni Użytkownicy
              </Text>
              <IconUsers size={16} color="var(--mantine-color-violet-6)" />
            </Group>
            <Text size="xl" fw={700}>
              2,847
            </Text>
            <Text size="xs" c="green">
              +12.5%
            </Text>
            <Box h={40} mt="sm">
              <Sparkline
                data={[
                  { value: 3 },
                  { value: 5 },
                  { value: 7 },
                  { value: 8 },
                  { value: 9 },
                  { value: 11 },
                  { value: 12 },
                ]}
                color="var(--mantine-color-violet-6)"
              />
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper shadow="sm" p="lg" radius="md" withBorder mb="xl">
        <Title order={3} mb="md">
          Market Analysis
        </Title>
        <Box h={350}>
          <Chart data={priceData} showPrediction />
        </Box>
      </Paper>

      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          Recent Transactions
        </Title>
        <DataTable
          data={recentTransactions}
          columns={tableColumns}
          pageSize={5}
        />
      </Paper>
    </Container>
  );
}
