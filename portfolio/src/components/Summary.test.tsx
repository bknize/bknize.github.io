import React from 'react';
import { render, screen } from '@testing-library/react';
import Summary from './Summary';

jest.mock('react-router', () => ({
  Link: ({ children, to, ...props }: { children: React.ReactNode; to: string; [k: string]: unknown }) => (
    <a href={to} {...props}>{children}</a>
  ),
}));

const baseProject = {
  id: 'proj1',
  title: 'Test Project',
  copy: 'A description of the project.',
  tech: ['React', 'TypeScript', 'MUI'],
  slug: 'test-project',
};

describe('Summary', () => {
  it('renders the project title', () => {
    render(<Summary project={baseProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the project description', () => {
    render(<Summary project={baseProject} />);
    expect(screen.getByText('A description of the project.')).toBeInTheDocument();
  });

  it('renders all tech tags', () => {
    render(<Summary project={baseProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('MUI')).toBeInTheDocument();
  });

  it('renders a case-study link when a slug is present', () => {
    render(<Summary project={baseProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'test-project');
    expect(link).toHaveTextContent(/case study/i);
  });

  it('omits the link when there is no slug', () => {
    render(<Summary project={{ ...baseProject, slug: undefined }} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('sets the wrapper id to the slug when available', () => {
    const { container } = render(<Summary project={baseProject} />);
    expect(container.querySelector('#test-project')).toBeInTheDocument();
  });

  it('falls back to title-based id when no slug', () => {
    const { container } = render(<Summary project={{ ...baseProject, slug: undefined }} />);
    expect(container.querySelector('#Test_Project')).toBeInTheDocument();
  });
});
