import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useForm(
  onSubmit: (email: string, password: string) => Promise<void>,
  redirectTo?: string
) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      await onSubmit(form.email, form.password);
      if (redirectTo) router.push(redirectTo);
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail?: string }>;
      setStatus({
        loading: false,
        error: axiosErr.response?.data?.detail || axiosErr.message || "Something went wrong",
      });
      return;
    }

    setStatus({ loading: false, error: "" });
  }

  return { form, status, handleChange, handleSubmit };
}
