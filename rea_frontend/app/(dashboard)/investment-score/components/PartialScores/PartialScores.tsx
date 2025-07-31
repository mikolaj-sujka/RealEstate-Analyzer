'use client';

import React from 'react';
import { SimpleGrid, Card, Text, Group, ThemeIcon } from '@mantine/core';
import { IconTrendingUp, IconBuildingStore, IconChartDonut, IconListNumbers } from '@tabler/icons-react';
import { CityInvestmentFactors } from '../../models';
import * as classes from './styles';
import { TextDescription } from '@/components/UI';

type PartialScoresProps = {
  partial: CityInvestmentFactors;
}

export function PartialScores({ partial }: PartialScoresProps) {
  const items = [
    { key: 'demographics', label: 'Demografia', icon: <IconTrendingUp size={24} /> },
    { key: 'infrastructure', label: 'Infrastruktura', icon: <IconBuildingStore size={24} /> },
    { key: 'marketDynamics', label: 'Dynamika Rynku', icon: <IconChartDonut size={24} /> },
    { key: 'macroeconomic', label: 'Makroekonomia', icon: <IconListNumbers size={24} /> },
  ] as const;

  return (
    <SimpleGrid cols={4}>
      {items.map(({ key, label, icon }) => (
        <Card className={classes.card} key={key}>
          <Group className={classes.headerGroup}>
            <ThemeIcon size="lg" radius="md" variant="light">
              {icon}
            </ThemeIcon>
            <TextDescription description={label} className={classes.label} />
          </Group>
          <Text className={classes.score}>
            {partial[key].toFixed(0)}/100
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  );
}
