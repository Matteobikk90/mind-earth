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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceMono.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="container m-auto flex flex-1 flex-col p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
