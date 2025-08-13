import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/providers";
import { Inter } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real Estate Analyzer",
  description: "Modern real estate analysis dashboard built with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/images/logo_realestate.png" />
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="auto">
          <I18nProvider>
            {children}
            <SpeedInsights />
            <Analytics />
          </I18nProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
