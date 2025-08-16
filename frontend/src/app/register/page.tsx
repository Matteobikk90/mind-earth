"use client";

import { AuthForm } from "@/components/AuthForm";
import api from "@/config/axios";
import { useAuth } from "@/hooks/useAuth";
import type { AxiosError } from "axios";

export default function RegisterPage() {
  const { form, status, handleChange, handleSubmit } = useAuth(
    async (email, password) => {
      try {
        await api.post("/auth/register", null, { params: { email, password } });
      } catch (err) {
        const axiosErr = err as AxiosError<{ detail?: string }>;
        throw new Error(
          axiosErr.response?.data?.detail || axiosErr.message || "Registration failed"
        );
      }
    },
    "/login" // redirect to login after success
  );

  return (
    <AuthForm
      title="Register"
      submitLabel="Register"
      link={{ href: "/login", label: "Already have an account?" }}
      form={form}
      status={status}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
