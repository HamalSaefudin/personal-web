import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateYearsOfExperience(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const anniversaryMonth = 9;

  let years = now.getFullYear() - start.getFullYear();
  const currentMonth = now.getMonth();

  if (currentMonth < anniversaryMonth) {
    years -= 1;
  }

  return Math.max(0, years);
}
