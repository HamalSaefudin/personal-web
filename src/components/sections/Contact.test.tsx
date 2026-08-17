import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the primary email CTA and contact destinations", () => {
    render(<Contact />);

    expect(screen.getByRole("link", { name: /email hamal/i })).toHaveAttribute(
      "href",
      "mailto:hamalsaefudin48@gmail.com",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/hamal-saefudin",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/HamalSaefudin",
    );
  });
});
