import React from 'react';
import { render, screen } from '@testing-library/react';
import WorkExperience from '../WorkExperience';

jest.mock('mobx-react-lite', () => ({
  observer: (component: React.FC) => component,
}));

jest.mock('react-router', () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string; [k: string]: unknown }) => (
    <a href={to} {...props}>{children}</a>
  ),
}));

jest.mock('../../utils/splatterState', () => ({
  splatterState: {
    section: { name: '', sprite: '', paint: '' },
  },
}));

const mockSplatter = jest.requireMock<{
  splatterState: { section: { name: string; sprite: string; paint: string } };
}>('../../utils/splatterState');

const mockJob = {
  id: 'job1',
  title: 'Software Engineer',
  year: '2024',
  copy: 'Built great software.',
  projects: [
    {
      id: 'p1',
      title: 'Widget App',
      copy: 'A widget builder.',
      tech: ['React', 'TS'],
      slug: 'widget-app',
    },
  ],
};

describe('WorkExperience', () => {
  beforeEach(() => {
    Object.assign(mockSplatter.splatterState.section, { name: '', sprite: '', paint: '' });
  });

  it('renders the job title', () => {
    render(<WorkExperience job={mockJob} />);
    expect(screen.getByRole('heading', { name: 'Software Engineer' })).toBeInTheDocument();
  });

  it('renders the job year', () => {
    render(<WorkExperience job={mockJob} />);
    expect(screen.getAllByText('2024').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the job description', () => {
    render(<WorkExperience job={mockJob} />);
    expect(screen.getByText('Built great software.')).toBeInTheDocument();
  });

  it('renders project summaries', () => {
    render(<WorkExperience job={mockJob} />);
    expect(screen.getByText('Widget App')).toBeInTheDocument();
    expect(screen.getByText('A widget builder.')).toBeInTheDocument();
  });

  it('uses transparent background when paint does not match experiencePaint', () => {
    mockSplatter.splatterState.section.paint = '#000000';
    const { container } = render(<WorkExperience job={mockJob} />);
    const yearEl = container.querySelector('h2');
    expect(yearEl).toHaveStyle({ backgroundColor: 'transparent' });
  });

  it('uses experiencePaint as background when paint matches', () => {
    mockSplatter.splatterState.section.paint = '#32C0CC';
    const { container } = render(<WorkExperience job={mockJob} />);
    const yearEl = container.querySelector('h2');
    expect(yearEl).toHaveStyle({ backgroundColor: '#32C0CC' });
  });
});
