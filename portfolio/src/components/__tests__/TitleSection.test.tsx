import React from 'react';
import { render, screen } from '@testing-library/react';
import TitleSection from '../TitleSection';

jest.mock('mobx-react-lite', () => ({
  observer: (component: React.FC) => component,
}));

jest.mock('../../hooks/useSectionScrollWatcher', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../utils/splatterState', () => ({
  splatterState: {
    section: { name: '', sprite: '', paint: '' },
  },
}));

const mockSplatter = jest.requireMock<{
  splatterState: { section: { name: string; sprite: string; paint: string } };
}>('../../utils/splatterState');

describe('TitleSection', () => {
  beforeEach(() => {
    Object.assign(mockSplatter.splatterState.section, { name: '', sprite: '', paint: '' });
  });

  it('renders the Title and Subtitle SVGs', () => {
    render(<TitleSection />);
    expect(screen.getByLabelText('Ben Knize')).toBeInTheDocument();
    expect(screen.getByLabelText('Frontend Developer')).toBeInTheDocument();
  });

  it('renders the portfolio heading', () => {
    render(<TitleSection />);
    expect(screen.getByText('A Portfolio Site')).toBeInTheDocument();
  });

  it('applies __active class when section name is empty', () => {
    const { container } = render(<TitleSection />);
    const titleContainer = container.querySelector('.title-container');
    expect(titleContainer).toHaveClass('__active');
  });

  it('applies __active class when section name is "title"', () => {
    mockSplatter.splatterState.section.name = 'title';
    const { container } = render(<TitleSection />);
    const titleContainer = container.querySelector('.title-container');
    expect(titleContainer).toHaveClass('__active');
  });

  it('applies __inactive class for other section names', () => {
    mockSplatter.splatterState.section.name = 'experience';
    const { container } = render(<TitleSection />);
    const titleContainer = container.querySelector('.title-container');
    expect(titleContainer).toHaveClass('__inactive');
    expect(titleContainer).not.toHaveClass('__active');
  });
});
