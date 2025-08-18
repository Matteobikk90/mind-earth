"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="font-space space-y-8">
      <h1 className="text-primary text-center font-sans text-4xl font-bold">MindEarth</h1>

      {isAuthenticated ? (
        <>
          <p className="text-foreground/90 text-center text-base">
            ✅ You are logged in. You can now explore the interactive map
          </p>

          <div className="border-foreground/20 bg-background m-auto max-w-max rounded-lg border p-6 shadow-md">
            <h2 className="text-foreground mb-3 text-lg font-semibold">Your details</h2>
            <p className="text-sm">
              <span className="font-medium">ID:</span>{" "}
              <span className="opacity-80">{user?.id}</span>
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span>{" "}
              <span className="opacity-80">{user?.email}</span>
            </p>
          </div>
        </>
      ) : (
        <p className="text-foreground/80 mt-4 text-center text-base">
          You’re not logged in yet. Please login to explore the interactive map and population data.
        </p>
      )}
    </section>
  );
}
