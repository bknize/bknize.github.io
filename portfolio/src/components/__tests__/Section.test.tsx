import { render, screen } from '@testing-library/react';
import Section from '../Section';

jest.mock('../../hooks/useSectionScrollWatcher', () => ({
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

  it('renders a <section> element with the home-section class', () => {
    const { container } = render(
      <Section title="About" name="about" sprite="" paint="">
        <p>Content</p>
      </Section>,
    );
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('home-section');
  });

  it('appends a custom className', () => {
    const { container } = render(
      <Section title="About" name="about" sprite="" paint="" className="extra">
        <p>Content</p>
      </Section>,
    );
    expect(container.querySelector('section')).toHaveClass('extra');
  });
});
