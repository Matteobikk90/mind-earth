"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";
  const logoSrc = isDark ? "/assets/images/logo-negative.png" : "/assets/images/logo-positive.png";

  return <Image src={logoSrc} alt="Mind Earth Logo" width={150} height={150} priority />;
}
