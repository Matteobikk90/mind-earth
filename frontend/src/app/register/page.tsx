"use client";

import api from "@/config/axios";
import type { AxiosError } from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", null, {
        params: { email, password },
      });
      setSuccess("User registered successfully, you can log in now.");
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      setError(error.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-background text-foreground flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-foreground/5 w-full max-w-sm rounded-xl p-6 shadow-md"
      >
        <h1 className="mb-4 text-center text-2xl font-bold">Register</h1>

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
        {success && <p className="mb-2 text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 font-semibold text-white transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  );
}
