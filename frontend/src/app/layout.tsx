import "@/app/globals.css";
import { inter, spaceMono } from "@/assets/fonts";
import Header from "@/components/Header";
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
        <main className="flex h-full flex-col items-center justify-center">{children}</main>
      </body>
    </html>
  );
}
