import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Experience } from "@/components/sections/Experience";

describe("Experience", () => {
  it("lists all five roles and exposes the timeline as one labelled graphic", () => {
    render(<Experience />);

    expect(screen.getByText("Sep 2023 – Present")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
    expect(screen.getByText(/quadrant synergy international/i)).toBeInTheDocument();

    const chart = screen.getByRole("img", { name: /timeline of five roles/i });
    expect(chart).toBeInTheDocument();
  });
});
