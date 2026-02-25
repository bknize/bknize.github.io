import { renderHook, waitFor } from '@testing-library/react';
import useCaseStudy from '../useCaseStudy';

jest.mock('../../routes/homeCopy', () => ({
  copy: {
    experience: [
      {
        id: 'exp1',
        title: 'Test Experience',
        year: '2024',
        copy: 'Test copy',
        projects: [
          {
            id: 'proj1',
            title: 'Test Project',
            copy: 'Project copy',
            slug: 'test-slug',
            tech: ['React'],
          },
          {
            id: 'proj2',
            title: 'Another Project',
            copy: 'Another copy',
            tech: ['Vue'],
          },
        ],
      },
    ],
  },
}));

describe('useCaseStudy', () => {
  it('starts with null values', () => {
    const { result } = renderHook(() => useCaseStudy('test-slug'));

    expect(result.current.error).toBeNull();
  });

  it('resolves project and experience by slug', async () => {
    const { result } = renderHook(() => useCaseStudy('test-slug'));

    await waitFor(() => {
      expect(result.current.markdown).not.toBeNull();
    });

    expect(result.current.project).toEqual(
      expect.objectContaining({ slug: 'test-slug', title: 'Test Project' }),
    );
    expect(result.current.experience).toEqual(
      expect.objectContaining({ id: 'exp1', title: 'Test Experience' }),
    );
    expect(result.current.markdown).toBe('test-file-stub');
  });

  it('returns null project/experience for an unknown slug', async () => {
    const { result } = renderHook(() => useCaseStudy('nonexistent'));

    await waitFor(() => {
      expect(result.current.markdown).not.toBeNull();
    });

    expect(result.current.experience).toBeNull();
    expect(result.current.project).toBeNull();
  });
});
