import { Group, Paper, ThemeIcon, Text } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import * as classes from "./styles/districtCardStyles.css";
import { MapRow } from "@/services/api/models";

type DistrictCardProps = {
  district: MapRow;
}

export const DistrictCard = ({ district }: DistrictCardProps) => {
  return (
    <Paper className={classes.card}>
      <Group className={classes.header}>
        <Group>
          <ThemeIcon variant="light" radius="md">
            <IconHome size={18} />
          </ThemeIcon>
          <Text fw={500}>{district.label}</Text>
        </Group>
      </Group>
      <Text className={classes.price}>
        {district.averagePrice.toLocaleString("pl-PL")} PLN/m²
      </Text>
      <Text className={classes.properties}>
        {district.properties} nieruchomości
      </Text>
    </Paper>
  );
}
