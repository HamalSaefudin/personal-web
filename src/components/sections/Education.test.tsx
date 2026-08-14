import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Education } from '@/components/sections/Education';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const renderWithTheme = (theme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider defaultTheme={theme} storageKey="test-theme">
      <Education />
    </ThemeProvider>
  );
};

describe('Education', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders education section with correct content', () => {
    renderWithTheme('light');

    expect(screen.getByText('Binus University')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Jun 2020 - Jul 2024')).toBeInTheDocument();
  });

  it('renders the education eyebrow', () => {
    renderWithTheme('light');
    expect(screen.getByRole('heading', { level: 2, name: 'Education' })).toBeInTheDocument();
  });

  it('applies correct styles for light mode', () => {
    renderWithTheme('light');
    const section = document.getElementById('education');
    expect(section).toBeInTheDocument();
  });

  it('applies correct styles for dark mode', () => {
    renderWithTheme('dark');
    const section = document.getElementById('education');
    expect(section).toBeInTheDocument();
  });

  it('has correct id for navigation', () => {
    renderWithTheme('light');
    const section = document.getElementById('education');
    expect(section).toHaveAttribute('id', 'education');
  });

  it('is accessible with proper heading structure', () => {
    renderWithTheme('light');
    const heading = screen.getByRole('heading', { level: 3, name: /binus university/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => renderWithTheme()).not.toThrow();
  });
});
