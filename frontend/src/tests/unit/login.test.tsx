import Login from "@/app/login/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";

// Mock axios
vi.mock("@/config/axios", () => ({
  default: { post: vi.fn() },
}));

// Mock next/router navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Login", () => {
  it("submits login successfully", async () => {
    const api = (await import("@/config/axios")).default;
    const { toast } = await import("sonner");

    (api.post as Mock).mockResolvedValue({
      data: { user: { email: "me@test.com" } },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "me@test.com", name: "email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret", name: "password" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(expect.stringContaining("Token will expire"));
    });
  });

  it("shows error on failed login", async () => {
    const api = (await import("@/config/axios")).default;
    const { toast } = await import("sonner");

    (api.post as Mock).mockRejectedValue({
      response: { data: { detail: "Invalid credentials" } },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "me@test.com", name: "email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass", name: "password" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Invalid credentials"));
    });
  });
});
