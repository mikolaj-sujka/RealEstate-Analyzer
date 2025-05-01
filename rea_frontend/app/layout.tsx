import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}