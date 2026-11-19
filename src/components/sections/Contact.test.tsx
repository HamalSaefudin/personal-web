import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("points the email CTA at the real address", () => {
    render(<Contact />);

    expect(screen.getByRole("heading", { name: /hiring for mobile/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "hamalsaefudin48@gmail.com" }),
    ).toHaveAttribute("href", "mailto:hamalsaefudin48@gmail.com");
  });
});
