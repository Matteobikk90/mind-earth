"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark ? "/assets/images/logo-negative.png" : "/assets/images/logo-positive.png";

  return <Image src={logoSrc} alt="Mind Earth Logo" width={150} height={76} priority />;
}
