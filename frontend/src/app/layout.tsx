import "@/app/globals.css";
import Providers from "@/app/Providers";
import { inter, spaceMono } from "@/assets/fonts";
import Header from "@/components/Header";

export const metadata = {
  title: "Mind Earth",
  description:
    "Full-stack geospatial app for MindEarth with interactive map and API backend for population statistics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="flex h-full flex-col items-center justify-center">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
