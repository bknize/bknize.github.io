import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import Summary from './Summary';

const baseProject = {
  id: 'proj1',
  title: 'Test Project',
  copy: 'A description of the project.',
  tech: ['React', 'TypeScript', 'MUI'],
  slug: 'test-project',
};

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Summary', () => {
  it('renders the project title', () => {
    renderWithRouter(<Summary project={baseProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the project description', () => {
    renderWithRouter(<Summary project={baseProject} />);
    expect(screen.getByText('A description of the project.')).toBeInTheDocument();
  });

  it('renders all tech tags', () => {
    renderWithRouter(<Summary project={baseProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('MUI')).toBeInTheDocument();
  });

  it('renders a case-study link when a slug is present', () => {
    renderWithRouter(<Summary project={baseProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-project');
    expect(link).toHaveTextContent(/case study/i);
  });

  it('omits the link when there is no slug', () => {
    renderWithRouter(<Summary project={{ ...baseProject, slug: undefined }} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('sets the wrapper id to the slug when available', () => {
    const { container } = renderWithRouter(<Summary project={baseProject} />);
    expect(container.querySelector('#test-project')).toBeInTheDocument();
  });

  it('falls back to title-based id when no slug', () => {
    const { container } = renderWithRouter(
      <Summary project={{ ...baseProject, slug: undefined }} />,
    );
    expect(container.querySelector('#Test_Project')).toBeInTheDocument();
  });

  it('navigates to the case study when the link is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Summary project={baseProject} />} />
          <Route path="test-project" element={<div>Case Study: Test Project</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /case study/i }));

    await waitFor(() => {
      expect(screen.getByText('Case Study: Test Project')).toBeInTheDocument();
    });
  });
});
