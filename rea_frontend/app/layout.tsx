import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { SplashScreen } from "@/components/SplashScreen/SplashScreen";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Real Estate Analyzer",
  description: "Analyze real estate properties with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <SplashScreen>{children}</SplashScreen>
        </MantineProvider>
      </body>
    </html>
  );
}
