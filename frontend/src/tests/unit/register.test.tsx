import Register from "@/app/register/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { AxiosInstance } from "axios";
import { vi } from "vitest";

// Mock axios
vi.mock("@/config/axios", () => ({
  default: { post: vi.fn() },
}));

// Mock router
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

describe("Register", () => {
  it("registers successfully", async () => {
    const api = (await import("@/config/axios")).default as unknown as AxiosInstance;
    const { toast } = await import("sonner");

    (api.post as jest.Mock).mockResolvedValue({
      data: { id: "123", email: "new@test.com" },
    });

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "new@test.com", name: "email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret", name: "password" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringContaining("Account created successfully")
      );
    });
  });

  it("shows error on duplicate email", async () => {
    const api = (await import("@/config/axios")).default as unknown as AxiosInstance;
    const { toast } = await import("sonner");

    (api.post as jest.Mock).mockRejectedValue({
      response: { data: { detail: "Email already registered" } },
    });

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "dup@test.com", name: "email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret", name: "password" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Email already registered"));
    });
  });
});
