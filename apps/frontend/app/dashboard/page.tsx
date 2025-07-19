'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTasks, Task } from '@/hooks/useTask';
import { TaskForm } from '@/components/forms/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  LogOut,
  User,
  CheckCircle2,
  Circle,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { tasks, isLoading, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (title: string, description: string) => {
    addTask(title, description);
    setIsFormOpen(false);
  };

  const handleEditTask = (title: string, description: string) => {
    if (editingTask) {
      updateTask(editingTask.id, { title, description });
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (task: Task) => {
    deleteTask(task.id);
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1>Minhas Tarefas</h1>
            <p className="text-muted-foreground">Bem-vindo, {user?.name}!</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsFormOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Nova Tarefa
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout} className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" /> Sair
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card><CardContent className="p-4 text-center"><p className="text-muted-foreground">Total</p><p>{tasks.length}</p></CardContent></Card>
              <Card><CardContent className="p-4 text-center"><p className="text-muted-foreground">Pendentes</p><p>{pendingTasks.length}</p></CardContent></Card>
              <Card><CardContent className="p-4 text-center"><p className="text-muted-foreground">Concluídas</p><p>{completedTasks.length}</p></CardContent></Card>
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
              <div className="space-y-6">
                {pendingTasks.length > 0 && (
                  <div>
                    <h2 className="mb-4 flex items-center gap-2">
                      <Circle className="h-5 w-5" /> Pendentes ({pendingTasks.length})
                    </h2>
                    <div className="space-y-2">
                      {pendingTasks.map(task => (
                        <TaskCard key={task.id} task={task} onToggle={toggleTask} onEdit={setEditingTask} onDelete={handleDeleteTask} />
                      ))}
                    </div>
                  </div>
                )}

                {completedTasks.length > 0 && (
                  <div>
                    <Separator />
                    <h2 className="mt-6 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" /> Concluídas ({completedTasks.length})
                    </h2>
                    <div className="space-y-2">
                      {completedTasks.map(task => (
                        <TaskCard key={task.id} task={task} onToggle={toggleTask} onEdit={setEditingTask} onDelete={handleDeleteTask} />
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

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card className={`transition-colors ${task.completed ? 'bg-muted/50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox checked={task.completed} onCheckedChange={() => onToggle(task.id)} className="mt-1" />
          <div className="flex-1 min-w-0">
            <h3 className={task.completed ? 'line-through text-muted-foreground' : ''}>{task.title}</h3>
            {task.description && <p className={`text-muted-foreground mt-1 ${task.completed ? 'line-through' : ''}`}>{task.description}</p>}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={task.completed ? 'secondary' : 'default'}>
                {task.completed ? 'Concluída' : 'Pendente'}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {task.createdAt.toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)} className="gap-2">
                <Edit className="h-4 w-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task)} className="gap-2 text-destructive">
                <Trash2 className="h-4 w-4" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
