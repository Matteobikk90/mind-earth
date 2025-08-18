"use client";

import { AuthForm } from "@/components/AuthForm";
import api from "@/config/axios";
import { useForm } from "@/hooks/useForm";
import { urls } from "@/utils/constants";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export default function Register() {
  const { form, status, handleChange, handleSubmit } = useForm(async (email, password) => {
    try {
      await api.post(urls.register, { email, password });
      toast.success("🎉 Account created successfully! You can now log in.");
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      const message = axiosErr.response?.data?.detail || axiosErr.message || "Registration failed";
      toast.error(`❌ ${message}`);
      throw new Error(message);
    }
  }, "/login");

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
