import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTheme } from "@/hooks/useTheme";

describe("useTheme", () => {
  it("starts dark and toggles to light, updating document and localStorage", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });
});
