import { renderHook } from '@testing-library/react';
import useSectionScrollWatcher from './useSectionScrollWatcher';
import { useInView } from 'motion/react';

const mockSetSection = jest.fn();

jest.mock('motion/react', () => ({
  useInView: jest.fn(() => false),
}));

jest.mock('../utils/splatterState', () => ({
  splatterState: {
    setSection: (...args: [unknown]) => mockSetSection(...args),
  },
}));

const mockUseInView = useInView as jest.Mock;

describe('useSectionScrollWatcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not trigger setSection on initial render when out of view', () => {
    mockUseInView.mockReturnValue(false);
    const ref = { current: document.createElement('div') };

    renderHook(() =>
      useSectionScrollWatcher({
        name: 'about', ref: ref as never, sprite: 's.png', paint: '#000',
      }),
    );

    expect(mockSetSection).not.toHaveBeenCalled();
  });

  it('does not trigger setSection on initial render when already in view', () => {
    mockUseInView.mockReturnValue(true);
    const ref = { current: document.createElement('div') };

    renderHook(() =>
      useSectionScrollWatcher({
        name: 'about', ref: ref as never, sprite: 's.png', paint: '#000',
      }),
    );

    expect(mockSetSection).not.toHaveBeenCalled();
  });

  it('calls setSection when transitioning from out-of-view to in-view', () => {
    mockUseInView.mockReturnValue(false);
    const ref = { current: document.createElement('div') };
    const section = { name: 'about', ref: ref as never, sprite: 's.png', paint: '#FFF' };

    const { rerender } = renderHook(() => useSectionScrollWatcher(section));
    expect(mockSetSection).not.toHaveBeenCalled();

    mockUseInView.mockReturnValue(true);
    rerender();

    expect(mockSetSection).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'about', sprite: 's.png', paint: '#FFF' }),
    );
  });

  it('does not call setSection when transitioning from in-view to out-of-view', () => {
    mockUseInView.mockReturnValue(true);
    const ref = { current: document.createElement('div') };

    const { rerender } = renderHook(() =>
      useSectionScrollWatcher({
        name: 'about', ref: ref as never, sprite: 's.png', paint: '#000',
      }),
    );

    mockUseInView.mockReturnValue(false);
    rerender();

    expect(mockSetSection).not.toHaveBeenCalled();
  });
});
