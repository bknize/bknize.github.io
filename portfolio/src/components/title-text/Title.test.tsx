import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title', () => {
  it('renders an svg with aria-label "Ben Knize"', () => {
    render(<Title />);
    expect(screen.getByLabelText('Ben Knize')).toBeInTheDocument();
  });
});
