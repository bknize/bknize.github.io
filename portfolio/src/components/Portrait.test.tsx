import React from 'react';
import { render } from '@testing-library/react';
import Portrait from './Portrait';

jest.mock('motion/react', () => {
  const ReactActual = jest.requireActual<typeof React>('react');
  const MotionDiv = ReactActual.forwardRef<HTMLDivElement, Record<string, unknown>>(
    ({ children, initial, animate, exit, transition, ...rest }, ref) => (
      <div ref={ref} {...rest}>{children as React.ReactNode}</div>
    ),
  );
  MotionDiv.displayName = 'motion.div';
  return {
    motion: { div: MotionDiv },
    useScroll: jest.fn(() => ({ scrollYProgress: { get: () => 0 } })),
  };
});

jest.mock('../hooks/useParallax', () => ({
  __esModule: true,
  default: jest.fn(() => 0),
}));

jest.mock('../assets/img/pic.jpg', () => 'test-portrait.jpg');

describe('Portrait', () => {
  it('renders the portrait image', () => {
    const { container } = render(<Portrait paint="#FF0094" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test-portrait.jpg');
  });

  it('renders the color overlay', () => {
    const { container } = render(<Portrait paint="#FF0094" />);
    const overlay = container.querySelector('.mix-blend-lighten');
    expect(overlay).toBeInTheDocument();
  });
});
