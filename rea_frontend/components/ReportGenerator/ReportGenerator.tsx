"use client";

import React from "react";
import { Group, Button, Text, Alert } from "@mantine/core";
import { IconDownload, IconAlertCircle } from "@tabler/icons-react";
import { useReportGenerator } from "@/hooks/useReportGenerator";
import { ReportDefinition } from "@/models";
import * as classes from "./styles";

type ReportGeneratorProps = {
  report: ReportDefinition;
  buttonLabel?: string;
  variant?:
    | "filled"
    | "outline"
    | "light"
    | "subtle"
    | "default"
    | "transparent";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export function ReportGenerator({
  report,
  buttonLabel = "Generuj raport PDF",
  variant = "filled",
  size = "sm",
}: ReportGeneratorProps) {
  const { isGenerating, error, generateReport, clearError } =
    useReportGenerator();

  return (
    <Group className={classes.reportGeneratorGroup}>
      <Button
        leftSection={<IconDownload size={18} />}
        onClick={() => generateReport(report)}
        loading={isGenerating}
        disabled={isGenerating}
        variant={variant}
        size={size}
      >
        {buttonLabel}
      </Button>
      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Błąd generowania raportu"
          color="red"
          withCloseButton
          onClose={clearError}
          mt="md"
        >
          {error}
        </Alert>
      )}
      <Text size="xs" c="dimmed">
        {`Raport zawiera sekcje: ${report.sections
          .map((s) => s.title)
          .join(", ")}`}
      </Text>
    </Group>
  );
}
