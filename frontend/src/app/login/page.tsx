"use client";

import api from "@/config/axios";
import { useStore } from "@/store";
import type { LoginResponseType } from "@/types/login";
import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const setToken = useStore((s) => s.setToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post<LoginResponseType>(
        "/auth/login",
        new URLSearchParams({
          username: email,
          password,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      setToken(res.data.access_token);
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      setError(error.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-background text-foreground flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-foreground/5 w-full max-w-sm rounded-xl p-6 shadow-md"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>

        <label className="mb-2 block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-md border border-gray-300 p-2 text-black"
          required
        />

        <label className="mb-2 block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md border border-gray-300 p-2 text-black"
          required
        />

        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

        <Link
          href="/register"
          className="bg-primary hover:bg-primary/90 ml-4 rounded-full px-3 py-1 text-sm text-white"
        >
          Register
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 font-semibold text-white transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
