import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("links to the sections and toggles the theme", async () => {
    render(<Header />);
    const user = userEvent.setup();

    expect(screen.getByRole("link", { name: /back to top/i })).toHaveAttribute("href", "#top");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "#experience");

    await user.click(screen.getByRole("button", { name: /switch to light theme/i }));
    expect(screen.getByRole("button", { name: /switch to dark theme/i })).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
