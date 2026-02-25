import { renderHook } from '@testing-library/react';
import useAspectResize from './useAspectResize';

const FRAME_PROPORTION = 1.78;
const FRAMES = 25;

describe('useAspectResize', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('sets dimensions for a wide landscape viewport (width-driven)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 2560, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1080, configurable: true });

    const el = document.createElement('div');
    const ref = { current: el } as React.RefObject<HTMLElement>;

    renderHook(() => useAspectResize(ref));

    // 2560/1080 ≈ 2.37 > 1.78 → width-driven
    expect(el.style.width).toBe(`${2560 * FRAMES}px`);
    expect(el.style.height).toBe(`${2560 / FRAME_PROPORTION}px`);
  });

  it('sets dimensions for a portrait viewport (height-driven)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1200, configurable: true });

    const el = document.createElement('div');
    const ref = { current: el } as React.RefObject<HTMLElement>;

    renderHook(() => useAspectResize(ref));

    // 800/1200 ≈ 0.67 < 1.78 → height-driven
    expect(el.style.width).toBe(`${1200 * FRAME_PROPORTION * FRAMES}px`);
    expect(el.style.height).toBe('1200px');
  });

  it('recalculates on window resize', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true });

    const el = document.createElement('div');
    const ref = { current: el } as React.RefObject<HTMLElement>;

    renderHook(() => useAspectResize(ref));

    Object.defineProperty(window, 'innerWidth', { value: 2560, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1080, configurable: true });
    window.dispatchEvent(new Event('resize'));

    expect(el.style.width).toBe(`${2560 * FRAMES}px`);
    expect(el.style.height).toBe(`${2560 / FRAME_PROPORTION}px`);
  });

  it('removes resize listener on unmount', () => {
    const spy = jest.spyOn(window, 'removeEventListener');
    const el = document.createElement('div');
    const ref = { current: el } as React.RefObject<HTMLElement>;

    const { unmount } = renderHook(() => useAspectResize(ref));
    unmount();

    expect(spy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
