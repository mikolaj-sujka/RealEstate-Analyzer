import React from 'react';
import { Container } from '@mantine/core';

export const DashboardSection = ({ children }: { children: React.ReactNode }) => {
    return <Container size="xl" py="xl">{children}</Container>;
};