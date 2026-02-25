import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router';
import CaseStudy from './CaseStudy';

jest.mock('marked-react', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => <div data-testid="markdown">{children}</div>,
}));

jest.mock('../utils/splatterState', () => ({
  splatterState: { setSection: jest.fn() },
}));

jest.mock('../hooks/useCaseStudy', () => {
  const results: Record<string, ReturnType<typeof defaultResult>> = {};

  const defaultResult = () => ({
    project: null,
    experience: null,
    markdown: null,
    error: null,
  });

  return {
    __esModule: true,
    default: (slug: string) => {
      if (!results[slug]) results[slug] = defaultResult();
      return results[slug];
    },
    _setResult: (slug: string, data: Record<string, unknown>) => {
      results[slug] = { ...defaultResult(), ...data };
    },
    _reset: () => {
      Object.keys(results).forEach((k) => delete results[k]);
    },
  };
});

const { _setResult, _reset } = jest.requireMock('../hooks/useCaseStudy') as {
  _setResult: (slug: string, data: Record<string, unknown>) => void;
  _reset: () => void;
};

const renderCaseStudy = (slug = 'test-slug') =>
  render(
    <MemoryRouter initialEntries={[`/${slug}`]}>
      <Routes>
        <Route path="/:id" element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>,
  );

afterEach(() => _reset());

describe('CaseStudy', () => {
  it('displays the project title when data is loaded', () => {
    _setResult('test-slug', {
      project: { title: 'CMS Edit', slug: 'cmsedit', copy: '' },
      markdown: '# Hello',
    });

    renderCaseStudy();
    expect(screen.getByText('Case Study:')).toBeInTheDocument();
    expect(screen.getByText('CMS Edit')).toBeInTheDocument();
  });

  it('renders markdown content', () => {
    _setResult('test-slug', {
      project: { title: 'CMS Edit', slug: 'cmsedit', copy: '' },
      markdown: 'Some **bold** content',
    });

    renderCaseStudy();
    expect(screen.getByText(/bold/)).toBeInTheDocument();
  });

  it('does not render markdown when it is null', () => {
    _setResult('test-slug', {
      project: { title: 'CMS Edit', slug: 'cmsedit', copy: '' },
      markdown: null,
    });

    const { container } = renderCaseStudy();
    expect(container.querySelector('.markdown')).not.toBeInTheDocument();
  });

  it('user clicks Back and navigates to the previous page', async () => {
    const user = userEvent.setup();

    _setResult('test-slug', {
      project: { title: 'CMS Edit', slug: 'cmsedit', copy: '' },
      markdown: '# Hello',
    });

    render(
      <MemoryRouter initialEntries={['/', '/test-slug']} initialIndex={1}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/:id" element={<CaseStudy />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('CMS Edit')).toBeInTheDocument();

    await user.click(screen.getByText('Back'));

    await waitFor(() => {
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
  });
});
