import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("renders the brand, nav links, and toggles the theme", async () => {
    render(<Header />);
    const user = userEvent.setup();

    expect(screen.getByText("HAMAL // DEV")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute("href", "#projects");

    expect(screen.getByRole("button", { name: /switch to light mode/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /switch to light mode/i }));
    expect(screen.getByRole("button", { name: /switch to dark mode/i })).toBeInTheDocument();
  });
});
