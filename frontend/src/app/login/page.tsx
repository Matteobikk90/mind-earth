"use client";

import { AuthForm } from "@/components/AuthForm";
import api from "@/config/axios";
import { useForm } from "@/hooks/useForm";
import type { LoginResponseType } from "@/types/login";
import { urls } from "@/utils/constants";
import type { AxiosError } from "axios";

export default function LoginPage() {
  const { form, status, handleChange, handleSubmit } = useForm(async (email, password) => {
    try {
      await api.post<LoginResponseType>(urls.login, {
        email,
        password,
      });
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      throw new Error(axiosErr.response?.data?.detail || axiosErr.message || "Login failed");
    }
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
