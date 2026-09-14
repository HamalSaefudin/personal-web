import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

describe("FeaturedProjects", () => {
  it("shows three projects first and expands to all six", async () => {
    render(<FeaturedProjects />);
    const user = userEvent.setup();

    expect(screen.getByText("DDMS Mobile Apps")).toBeInTheDocument();
    expect(screen.queryByText("Miruum")).not.toBeInTheDocument();
    expect(screen.queryByText("Mantis Go")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /load 3 more projects/i }));
    expect(screen.getByText("Miruum")).toBeInTheDocument();
    expect(screen.getByText("Mirecruit")).toBeInTheDocument();
  });
});
