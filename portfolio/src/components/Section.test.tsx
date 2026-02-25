import { render, screen } from '@testing-library/react';
import Section from './Section';

jest.mock('../hooks/useSectionScrollWatcher', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Section', () => {
  it('renders children', () => {
    render(
      <Section title="About" name="about" sprite="" paint="">
        <p>Section body</p>
      </Section>,
    );
    expect(screen.getByText('Section body')).toBeInTheDocument();
  });
});
