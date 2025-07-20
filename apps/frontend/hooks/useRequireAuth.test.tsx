import { renderHook } from '@testing-library/react';
import { useRequireAuth } from './useRequireAuth';

const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: jest.fn(),
}));



function mockLocalStorage(token: string | null) {
  const store: Record<string, string> = {};
  if (token) store['token'] = token;
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => (store[key] = value)),
    removeItem: jest.fn((key: string) => delete store[key]),
    clear: jest.fn(() => Object.keys(store).forEach(k => delete store[k])),
  };
}

describe('useRequireAuth', () => {
  let localStorageMock: any;

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {},
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function setup({ token, pathname }: { token: string | null; pathname: string }) {
    localStorageMock = mockLocalStorage(token);
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    const usePathname = require('next/navigation').usePathname;
    usePathname.mockReturnValue(pathname);

    return renderHook(() => useRequireAuth());
  }

  it('redireciona para /login se não tiver token e estiver em rota protegida', () => {
    setup({ token: null, pathname: '/dashboard' });
    expect(mockReplace).toHaveBeenCalledWith('/login');
  });

  it('não redireciona se não tiver token e já estiver em /login', () => {
    setup({ token: null, pathname: '/login' });
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('não redireciona se não tiver token e já estiver em /register', () => {
    setup({ token: null, pathname: '/register' });
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('redireciona para /dashboard se já tiver token e estiver em /login', () => {
    setup({ token: 'fake-token', pathname: '/login' });
    expect(mockReplace).toHaveBeenCalledWith('/dashboard');
  });

  it('redireciona para /dashboard se já tiver token e estiver em /register', () => {
    setup({ token: 'fake-token', pathname: '/register' });
    expect(mockReplace).toHaveBeenCalledWith('/dashboard');
  });

  it('não redireciona se já tiver token e estiver em rota protegida', () => {
    setup({ token: 'fake-token', pathname: '/dashboard' });
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
