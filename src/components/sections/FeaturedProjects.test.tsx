import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

describe("FeaturedProjects", () => {
  it("shows four projects first and expands to all projects", async () => {
    render(<FeaturedProjects />);
    const user = userEvent.setup();

    expect(screen.getByText("DDMS Mobile Apps")).toBeInTheDocument();
    expect(screen.getByText("Mantis Go")).toBeInTheDocument();
    expect(screen.queryByText("Miruum")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /view all 6 projects/i }));
    expect(screen.getByText("Miruum")).toBeInTheDocument();
    expect(screen.getByText("Mirecruit")).toBeInTheDocument();
  });
});
