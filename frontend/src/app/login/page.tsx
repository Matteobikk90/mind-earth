"use client";

import { AuthForm } from "@/components/AuthForm";
import api from "@/config/axios";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/store";
import type { LoginResponseType } from "@/types/login";

export default function LoginPage() {
  const setToken = useStore(({ setToken }) => setToken);

  const { form, status, handleChange, handleSubmit } = useAuth(async (email, password) => {
    const res = await api.post<LoginResponseType>(
      "/auth/login",
      new URLSearchParams({ username: email, password }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    setToken(res.data.access_token);
  }, "/");

  return (
    <AuthForm
      title="Login"
      submitLabel="Login"
      link={{ href: "/register", label: "Create account" }}
      form={form}
      status={status}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
