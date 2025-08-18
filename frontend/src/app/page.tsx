"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <h1 className="font-sans text-3xl font-bold">MindEarth</h1>
      <p className="mt-4 text-base opacity-80">
        {isAuthenticated ? (
          <>
            ✅ Logged in as
            <br />
            <span>ID:</span> {user?.id} <br />
            <span>Email:</span> {user?.email}
          </>
        ) : (
          "You’re not logged in yet. Please log in to explore the interactive map and population data."
        )}
      </p>
    </>
  );
}
