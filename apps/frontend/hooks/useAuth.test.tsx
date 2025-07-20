import { render, waitFor, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './useAuth';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

global.fetch = jest.fn();

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => (store[key] = value.toString())),
    removeItem: jest.fn((key) => delete store[key]),
    clear: jest.fn(() => (store = {})),
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const TestComponent = () => {
  const { user, login, register, logout, isLoading } = useAuth();

  return (
    <div>
      <div data-testid="user-email">{user?.email || 'no-user'}</div>
      <div data-testid="loading">{isLoading ? 'loading' : 'idle'}</div>
      <button onClick={() => login('test@example.com', '123456')}>Login</button>
      <button onClick={() => register('test@example.com', '123456')}>Register</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  it('should initialize with no user and idle loading', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-email')).toHaveTextContent('no-user');
    expect(screen.getByTestId('loading')).toHaveTextContent('idle');
  });

  it('should login and store user/token', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          id: '1',
          email: 'test@example.com',
          token: 'abc123',
        },
      }),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
      expect(window.localStorage.setItem).toHaveBeenCalledWith('token', 'abc123');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({ id: '1', email: 'test@example.com' })
      );
    });
  });

  it('should call register endpoint', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { message: 'User registered' },
      }),
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Register').click();
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/register'),
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('should logout and clear storage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Logout').click();
    });

    expect(window.localStorage.removeItem).toHaveBeenCalledWith('user_email');
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(screen.getByTestId('user-email')).toHaveTextContent('no-user');
  });

  it('should initialize user from localStorage if valid', async () => {
    window.localStorage.setItem(
      'user',
      JSON.stringify({ id: '1', email: 'stored@example.com' })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user-email')).toHaveTextContent('stored@example.com');
    });
  });
});
