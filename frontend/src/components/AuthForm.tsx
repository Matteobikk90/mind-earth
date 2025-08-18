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
      className="bg-background text-foreground border-foreground/10 w-full max-w-md space-y-6 rounded-2xl border p-8 shadow-lg"
    >
      <h1 className="text-center text-3xl font-bold">{title}</h1>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="username"
          className="border-foreground/20 bg-background text-foreground placeholder:text-foreground/50 focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 focus:ring-1"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          className="border-foreground/20 bg-background text-foreground placeholder:text-foreground/50 focus:border-primary focus:ring-primary w-full rounded-md border px-3 py-2 focus:ring-1"
          required
        />
      </div>

      {status.error && <p className="text-accent mb-2 text-sm">{status.error}</p>}

      <div className="flex items-center justify-between">
        {link && (
          <Link href={link.href} className="text-primary text-sm font-medium hover:underline">
            {link.label}
          </Link>
        )}

        <button
          type="submit"
          disabled={status.loading}
          className="bg-primary text-background rounded-md px-4 py-2 font-semibold transition hover:opacity-90 disabled:opacity-50"
        >
          {status.loading ? "Loading..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
