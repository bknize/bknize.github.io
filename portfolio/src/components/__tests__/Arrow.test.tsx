import { render } from '@testing-library/react';
import Arrow from '../Arrow';

describe('Arrow', () => {
  it('renders an svg element', () => {
    const { container } = render(<Arrow />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a path for the arrow shape', () => {
    const { container } = render(<Arrow />);
    expect(container.querySelector('path')).toBeInTheDocument();
  });

  it('applies the className prop', () => {
    const { container } = render(<Arrow className="w-8" />);
    expect(container.querySelector('svg')).toHaveClass('w-8');
  });

  it('merges custom CSS properties into the style', () => {
    const { container } = render(<Arrow color="red" />);
    const svg = container.querySelector('svg')!;
    expect(svg.style.color).toBe('red');
    expect(svg.style.stroke).toBe('currentColor');
  });

  it('does not set className when not provided', () => {
    const { container } = render(<Arrow />);
    expect(container.querySelector('svg')!.hasAttribute('class')).toBe(false);
  });
});
