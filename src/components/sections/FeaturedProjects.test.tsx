import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

describe("FeaturedProjects", () => {
  it("renders every project with a working store link", () => {
    render(<FeaturedProjects />);

    const links = screen.getAllByRole("link", { name: /play store/i });
    expect(links).toHaveLength(4);
    for (const link of links) {
      expect(link).toHaveAttribute("href", expect.stringContaining("play.google.com/store/apps"));
    }
    expect(screen.getByRole("heading", { name: /ddms mobile apps/i })).toBeInTheDocument();
  });
});
