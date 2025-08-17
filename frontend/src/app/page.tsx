"use client";

import { useStore } from "@/store";

export default function Home() {
  const token = useStore(({ token }) => token);

  return (
    <>
      <h1 className="font-sans text-3xl font-bold">MindEarth</h1>
      <p className="mt-4 text-base opacity-80">
        {token
          ? "You are logged in! Explore the interactive map and population data."
          : "You’re not logged in yet. Please log in to explore the interactive map and population data."}
      </p>
    </>
  );
}
