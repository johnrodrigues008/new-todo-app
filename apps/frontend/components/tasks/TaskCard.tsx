'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { Task } from "@/hooks/useTask";

const TASK_STATUS = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em andamento' },
  { value: 'DONE', label: 'Concluída' },
];

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (id: string, status: string) => void;
}

export function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  return (
    <Card className="transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.status === 'DONE'}
            onCheckedChange={() => onToggle(task.id_task)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <h3 className={task.status === 'DONE' ? 'line-through text-muted-foreground' : ''}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-muted-foreground mt-1 ${task.status === 'DONE' ? 'line-through' : ''}`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <select
                value={task.status}
                onChange={e => onStatusChange(task.id_task, e.target.value)}
                className="border rounded px-2 py-1 text-xs"
              >
                {TASK_STATUS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <Badge variant={
                task.status === 'DONE'
                  ? 'secondary'
                  : task.status === 'IN_PROGRESS'
                  ? 'default'
                  : 'outline'
              }>
                {TASK_STATUS.find(s => s.value === task.status)?.label ?? task.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="mais opções"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
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
