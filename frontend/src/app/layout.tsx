import { inter, spaceMono } from "@/app/assets/fonts";
import Header from "@/app/components/Header";
import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mind Earth",
  description:
    "Full-stack geospatial app for MindEarth with interactive map and API backend for population statistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
