import { renderHook } from '@testing-library/react';
import useParallax from '../useParallax';
import { useTransform } from 'motion/react';

jest.mock('motion/react', () => ({
  useTransform: jest.fn(() => ({ get: () => 0 })),
}));

const mockUseTransform = useTransform as jest.Mock;

describe('useParallax', () => {
  beforeEach(() => {
    mockUseTransform.mockClear();
  });

  it('calls useTransform with correct input/output ranges', () => {
    const mockValue = { get: () => 0.5 } as never;
    renderHook(() => useParallax(mockValue, 100));
    expect(mockUseTransform).toHaveBeenCalledWith(mockValue, [0, 1], [-100, 100]);
  });

  it('negates the distance for the output range', () => {
    const mockValue = { get: () => 0 } as never;
    renderHook(() => useParallax(mockValue, -50));
    expect(mockUseTransform).toHaveBeenCalledWith(mockValue, [0, 1], [50, -50]);
  });

  it('returns the MotionValue from useTransform', () => {
    const expected = { get: () => 42 };
    mockUseTransform.mockReturnValue(expected);

    const mockValue = { get: () => 0 } as never;
    const { result } = renderHook(() => useParallax(mockValue, 200));
    expect(result.current).toBe(expected);
  });
});
