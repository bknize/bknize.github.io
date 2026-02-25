import { render, screen } from '@testing-library/react';
import Subtitle from '../Subtitle';

describe('Subtitle', () => {
  it('renders an svg with aria-label "Frontend Developer"', () => {
    render(<Subtitle />);
    expect(screen.getByLabelText('Frontend Developer')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Subtitle className="subtitle-text" />);
    expect(container.querySelector('svg')).toHaveClass('subtitle-text');
  });

  it('spreads CSS properties into the style attribute', () => {
    const { container } = render(<Subtitle fill="white" stroke="transparent" />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.fill).toBe('white');
    expect(svg.style.stroke).toBe('transparent');
  });
});
