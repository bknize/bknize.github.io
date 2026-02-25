import { render } from '@testing-library/react';
import Arrow from './Arrow';

describe('Arrow', () => {
  it('renders an svg element', () => {
    const { container } = render(<Arrow />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
