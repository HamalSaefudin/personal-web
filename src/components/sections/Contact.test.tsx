import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the heading and the email CTA", () => {
    render(<Contact />);

    expect(
      screen.getByRole("heading", { name: /let's make something useful/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /hamalsaefudin48@gmail.com/i }),
    ).toHaveAttribute("href", "mailto:hamalsaefudin48@gmail.com");
  });
});
