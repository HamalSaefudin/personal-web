import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Experience } from "@/components/sections/Experience";

describe("Experience", () => {
  it("shows three positions first and expands to all five", async () => {
    render(<Experience />);
    const user = userEvent.setup();

    expect(screen.getByText(/tiga daya digital/i)).toBeInTheDocument();
    expect(screen.queryByText(/quadrant synergy/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /view all 5 positions/i }));
    expect(screen.getByText(/quadrant synergy/i)).toBeInTheDocument();
  });
});