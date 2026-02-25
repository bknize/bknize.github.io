import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import Home from './Home';

jest.mock('mobx-react-lite', () => ({
  observer: (component: React.FC) => component,
}));

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
  default: jest.fn(() => ({ get: () => 0 })),
}));

jest.mock('../hooks/useSectionScrollWatcher', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../utils/splatterState', () => ({
  splatterState: {
    section: { name: '', paint: '' },
    setSection: jest.fn(),
  },
}));

const renderHome = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":slug" element={<div>Case Study Screen</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe('Home', () => {
  it('renders the about section with intro text', () => {
    renderHome();
    expect(screen.getByText(/^Hi.~$/)).toBeInTheDocument();
    const introParagraphs = screen.getAllByText(/frontend engineer based in/i);
    expect(introParagraphs.length).toBeGreaterThan(0);
  });

  it('renders job titles in the experience section', () => {
    renderHome();
    expect(screen.getByText('Software Design Engineer')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Multimedia Developer')).toBeInTheDocument();
  });

  it('renders qualification headings', () => {
    renderHome();
    expect(
      screen.getByText(/decision maker able to balance/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/agent of systems for consistent/i),
    ).toBeInTheDocument();
  });

  it('renders footer contact links', () => {
    renderHome();
    const linkedIn = screen.getByRole('link', { name: /in\/benknize/i });
    expect(linkedIn).toHaveAttribute('href', 'http://linkedin.com/in/benknize/');

    const email = screen.getByRole('link', { name: /bknize@gmail/i });
    expect(email).toHaveAttribute('href', 'mailto:bknize@gmail.com');
  });

  it('user clicks a case study link and navigates away', async () => {
    const user = userEvent.setup();
    renderHome();

    const caseStudyLinks = screen.getAllByRole('link', { name: /case study/i });
    expect(caseStudyLinks.length).toBeGreaterThan(0);

    await user.click(caseStudyLinks[0]);

    await waitFor(() => {
      expect(screen.getByText('Case Study Screen')).toBeInTheDocument();
    });
  });
});
