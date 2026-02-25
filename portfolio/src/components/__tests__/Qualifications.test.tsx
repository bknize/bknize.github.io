import React from 'react';
import { render, screen } from '@testing-library/react';
import Qualification from '../Qualifications';

jest.mock('mobx-react-lite', () => ({
  observer: (component: React.FC) => component,
}));

const mockQualification = {
  opener: 'Decision maker',
  copy: 'Ensured health insurance claim workflows were seamless.',
};

describe('Qualification', () => {
  it('renders the opener as a heading', () => {
    render(<Qualification qualification={mockQualification} />);
    expect(screen.getByRole('heading', { name: 'Decision maker' })).toBeInTheDocument();
  });

  it('renders the copy text', () => {
    render(<Qualification qualification={mockQualification} />);
    expect(
      screen.getByText('Ensured health insurance claim workflows were seamless.'),
    ).toBeInTheDocument();
  });
});
