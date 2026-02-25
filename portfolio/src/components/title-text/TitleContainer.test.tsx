import { render, screen } from '@testing-library/react';
import TitleContainer from './TitleContainer';

describe('TitleContainer', () => {
  it('renders children', () => {
    render(
      <TitleContainer>
        <span>Hello</span>
      </TitleContainer>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
