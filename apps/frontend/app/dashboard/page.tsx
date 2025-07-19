'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTasks, Task } from '@/hooks/useTask';
import { TaskForm } from '@/components/forms/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  LogOut,
  User,
  CheckCircle2,
  Circle,
  Timer,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TaskCard } from '@/components/tasks/TaskCard';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { tasks, isLoading, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  // Checagem do token antes de mostrar a página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null;

  // Nova contagem por status
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === 'PENDING');
  const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
  const doneTasks = tasks.filter(task => task.status === 'DONE');

  const handleAddTask = (title: string, description: string, status: string) => {
    addTask(title, description, status);
    setIsFormOpen(false);
  };

  const handleEditTask = (title: string, description: string, status: string) => {
    if (editingTask) {
      updateTask(editingTask.id_task, { title, description, status });
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (task: Task) => {
    deleteTask(task.id_task);
  };

  const handleStatusChange = (id: string, status: string) => {
    updateTask(id, { status });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1>Minhas Tarefas</h1>
            <p className="text-muted-foreground">Bem-vindo, {user?.email}!</p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => setIsFormOpen(true)} className="gap-2 cursor-pointer">
              <Plus className="h-4 w-4" /> Nova Tarefa
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout} className="gap-2 text-destructive cursor-pointer">
                  <LogOut className="h-4 w-4 cursor-pointer" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Carregando tarefas...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-muted-foreground">Total</p>
                  <p>{totalTasks}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-muted-foreground">Pendentes</p>
                  <p>{pendingTasks.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-muted-foreground">Em Andamento</p>
                  <p>{inProgressTasks.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-muted-foreground">Concluídas</p>
                  <p>{doneTasks.length}</p>
                </CardContent>
              </Card>
            </div>

            {tasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Circle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3>Nenhuma tarefa encontrada</h3>
                  <p className="text-muted-foreground mb-4">
                    Crie sua primeira tarefa para começar a organizar seu dia!
                  </p>
                  <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Criar Primeira Tarefa
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-10">
                {pendingTasks.length > 0 && (
                  <div>
                    <h2 className="mb-4 flex items-center gap-2">
                      <Circle className="h-5 w-5" /> Pendentes ({pendingTasks.length})
                    </h2>
                    <div className="space-y-2">
                      {pendingTasks.map(task => (
                        <TaskCard
                          key={task.id_task}
                          task={task}
                          onToggle={toggleTask}
                          onEdit={setEditingTask}
                          onDelete={handleDeleteTask}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {inProgressTasks.length > 0 && (
                  <div>
                    <Separator />
                    <h2 className="mt-6 mb-4 flex items-center gap-2">
                      <Timer className="h-5 w-5 text-yellow-500" /> Em Andamento ({inProgressTasks.length})
                    </h2>
                    <div className="space-y-2">
                      {inProgressTasks.map(task => (
                        <TaskCard
                          key={task.id_task}
                          task={task}
                          onToggle={toggleTask}
                          onEdit={setEditingTask}
                          onDelete={handleDeleteTask}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {doneTasks.length > 0 && (
                  <div>
                    <Separator />
                    <h2 className="mt-6 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" /> Concluídas ({doneTasks.length})
                    </h2>
                    <div className="space-y-2">
                      {doneTasks.map(task => (
                        <TaskCard
                          key={task.id_task}
                          task={task}
                          onToggle={toggleTask}
                          onEdit={setEditingTask}
                          onDelete={handleDeleteTask}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <TaskForm
        open={isFormOpen || !!editingTask}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingTask(null);
        }}
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        task={editingTask}
      />
    </div>
  );
}
