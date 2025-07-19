import { useState, useEffect } from 'react';

export interface Task {
  id_task: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const id_user = user ? JSON.parse(user).id : null;
      const res = await fetch(`${API_URL}/tasks/user/${id_user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Erro ao buscar tarefas');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setTasks([]);
    }
    setIsLoading(false);
  }

  async function addTask(title: string, description: string, status: string = 'PENDING') {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const id_author = user ? JSON.parse(user).id : null;

    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id_author, title, description, status }),
    });
    if (!res.ok) throw new Error('Erro ao criar tarefa');
    await fetchTasks();
  }

  async function updateTask(id_task: string, updates: Partial<Omit<Task, 'id_task' | 'createdAt'>>) {
    const token = localStorage.getItem('token');
    console.log('Payload de update:', updates);
    const res = await fetch(`${API_URL}/tasks/${id_task}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Erro na atualização:', errorText);
      throw new Error('Erro ao atualizar tarefa');
    }
    await fetchTasks();
  }

  async function deleteTask(id_task: string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/tasks/${id_task}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Erro ao excluir tarefa');
    await fetchTasks();
  }

  async function toggleTask(id: string) {
    const task = tasks.find(t => t.id_task === id);
    if (!task) return;
    let newStatus = 'PENDING';
    if (task.status === 'PENDING') newStatus = 'IN_PROGRESS';
    else if (task.status === 'IN_PROGRESS') newStatus = 'DONE';
    else if (task.status === 'DONE') newStatus = 'PENDING';

    await updateTask(id, { status: newStatus });
  }

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    fetchTasks
  };
}
