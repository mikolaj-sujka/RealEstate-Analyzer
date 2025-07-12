"use client";

import { Chart } from "@/components/UI/chart";
import { DataTable } from "@/components/UI/data-table";
import Sparkline from "@/components/UI/sparkline-component";
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
                data={[4, 6, 8, 7, 9, 8, 10]}
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
                data={[8, 6, 7, 5, 4, 6, 5]}
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
                data={[3, 5, 7, 8, 9, 11, 12]}
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
