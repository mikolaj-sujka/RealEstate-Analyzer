"use client";

import { Container, Stack } from "@mantine/core";
import {
  FaqSection,
  HelpHeader,
  ResourcesSection,
  SystemStatus,
} from "./components";
import { ContactSection } from "./components/ContactSection";
import { contactOptions, faqItems, resources } from "./models/consts";
import { ContainerSection } from "@/components/ContainerSection";
import { useTranslate } from "@/hooks";

export default function HelpCenterPage() {
  const { t } = useTranslate();
  return (
    <ContainerSection>
      <Stack gap="xl">
        <HelpHeader translate={t} />
        <ContactSection translate={t} options={contactOptions} />
        <FaqSection translate={t} items={faqItems} />
        <ResourcesSection translate={t} resources={resources} />
        <SystemStatus translate={t} />
      </Stack>
    </ContainerSection>
  );
}
