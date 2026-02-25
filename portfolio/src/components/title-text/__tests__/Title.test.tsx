import { render, screen } from '@testing-library/react';
import Title from '../Title';

describe('Title', () => {
  it('renders an svg with aria-label "Ben Knize"', () => {
    render(<Title />);
    expect(screen.getByLabelText('Ben Knize')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Title className="title-text stroke-1" />);
    expect(container.querySelector('svg')).toHaveClass('title-text');
  });

  it('spreads CSS properties into the style attribute', () => {
    const { container } = render(<Title fill="red" />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.fill).toBe('red');
  });

  it('preserves default SVG styles', () => {
    const { container } = render(<Title />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.strokeLinejoin).toBe('round');
  });
});
