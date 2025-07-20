import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks, Task } from './useTask';

function mockLocalStorage() {
  const store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => (store[key] = value)),
    removeItem: jest.fn((key: string) => delete store[key]),
    clear: jest.fn(() => Object.keys(store).forEach(k => delete store[k])),
  };
}

const localStorageMock = mockLocalStorage();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'fake-token';
      if (key === 'user') return JSON.stringify({ id: '1' });
      return null;
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('busca as tarefas ao montar', async () => {
    const fakeTasks: Task[] = [
      { id_task: '1', title: 'Tarefa 1', description: '', status: 'PENDING', createdAt: '', updatedAt: '' }
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => fakeTasks
    } as any);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.tasks).toEqual(fakeTasks);
    expect(result.current.isLoading).toBe(false);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('adiciona uma nova tarefa', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true, json: async () => [] });

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.addTask('Nova tarefa', 'Descrição');
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tasks'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('deleta uma tarefa', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true, json: async () => [] });

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.deleteTask('1');
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('faz toggle do status da tarefa', async () => {
    const fakeTasks: Task[] = [
      { id_task: '1', title: 'Task', description: '', status: 'PENDING', createdAt: '', updatedAt: '' }
    ];
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => fakeTasks })
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true, json: async () => fakeTasks });

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.toggleTask('1');
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/1'),
      expect.objectContaining({ method: 'PATCH' })
    );
  });
});
