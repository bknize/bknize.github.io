import { render, screen } from '@testing-library/react';
import Subtitle from './Subtitle';

describe('Subtitle', () => {
  it('renders an svg with aria-label "Frontend Developer"', () => {
    render(<Subtitle />);
    expect(screen.getByLabelText('Frontend Developer')).toBeInTheDocument();
  });
});
