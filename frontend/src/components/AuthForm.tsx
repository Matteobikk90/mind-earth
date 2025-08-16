import type { AuthFormType } from "@/types/form";
import Link from "next/link";

export function AuthForm({
  title,
  submitLabel,
  link,
  form,
  status,
  handleChange,
  handleSubmit,
}: AuthFormType) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-foreground/5 w-full max-w-md space-y-6 rounded-2xl p-8 shadow-lg"
    >
      <h1 className="text-center text-3xl font-bold">{title}</h1>

      <label className="mb-1 block text-sm font-medium">Email</label>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        autoComplete="username"
        className="w-full rounded-md border border-gray-300 p-2 text-black"
        required
      />

      <label className="mb-1 block text-sm font-medium">Password</label>
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        autoComplete="current-password"
        className="w-full rounded-md border border-gray-300 p-2 text-black"
        required
      />

      {status.error && <p className="mb-2 text-sm text-red-500">{status.error}</p>}

      <div className="flex items-center justify-between">
        {link && (
          <Link href={link.href} className="text-primary text-sm font-medium hover:underline">
            {link.label}
          </Link>
        )}

        <button
          type="submit"
          disabled={status.loading}
          className="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 font-semibold text-white transition"
        >
          {status.loading ? "Loading..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
