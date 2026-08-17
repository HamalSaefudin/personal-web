import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Education } from '@/components/sections/Education';

const renderEducation = () => render(<Education />);

describe('Education', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders education section with correct content', () => {
    renderEducation();

    expect(screen.getByText('Binus University')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Jun 2020 - Jul 2024')).toBeInTheDocument();
  });

  it('renders the education eyebrow', () => {
    renderEducation();
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Education' })).toBeInTheDocument();
  });

  it('renders the education section', () => {
    renderEducation();
    const section = document.getElementById('education');
    expect(section).toBeInTheDocument();
  });

  it('has correct id for navigation', () => {
    renderEducation();
    const section = document.getElementById('education');
    expect(section).toHaveAttribute('id', 'education');
  });

  it('is accessible with proper heading structure', () => {
    renderEducation();
    const heading = screen.getByRole('heading', { level: 3, name: /binus university/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => renderEducation()).not.toThrow();
  });
});
