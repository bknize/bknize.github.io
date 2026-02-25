import { render, screen } from '@testing-library/react';
import TitleContainer from '../TitleContainer';

describe('TitleContainer', () => {
  it('renders children', () => {
    render(
      <TitleContainer>
        <span>Hello</span>
      </TitleContainer>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('wraps children in a fixed-position div', () => {
    const { container } = render(
      <TitleContainer>
        <span>Content</span>
      </TitleContainer>,
    );
    expect(container.firstElementChild).toHaveClass('fixed');
  });
});
