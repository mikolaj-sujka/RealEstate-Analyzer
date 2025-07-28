import { DistrictData } from "@/models";
import { Group, Paper, ThemeIcon, Text } from "@mantine/core";
import { IconHome, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import * as classes from "./styles/districtCardStyles.css";

type DistrictCardProps = {
  district: DistrictData;
}

export const DistrictCard = ({ district }: DistrictCardProps) => {
  return (
    <Paper className={classes.card}>
      <Group className={classes.header}>
        <Group>
          <ThemeIcon variant="light" radius="md">
            <IconHome size={18} />
          </ThemeIcon>
          <Text fw={500}>{district.district}</Text>
        </Group>
        {district.trend === "up" ? (
          <IconTrendingUp size={16} color="var(--mantine-color-green-6)" />
        ) : (
          <IconTrendingDown size={16} color="var(--mantine-color-red-6)" />
        )}
      </Group>
      <Text className={classes.price}>
        {district.averagePrice.toLocaleString("pl-PL")} PLN/m²
      </Text>
      <Text className={classes.properties}>
        {district.properties} nieruchomości
      </Text>
      <Text className={district.trend === "up" ? classes.changeUp : classes.changeDown}>
        {district.change} w tym miesiącu
      </Text>
    </Paper>
  );
}
