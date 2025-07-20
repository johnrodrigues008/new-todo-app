'use client';

import { useState, useEffect } from 'react';
import { Task } from '../../hooks/useTask';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Loader2 } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Status = {
  value: string;
  label: string;
};

const STATUSES: Status[] = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em andamento' },
  { value: 'DONE', label: 'Concluída' },
];

// Extensão local do tipo Task para incluir status
interface TaskWithStatus extends Task {
  status: string;
}

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, description: string, status: string) => void;
  task?: Task | null;
  isLoading?: boolean;
}

export function TaskForm({ open, onOpenChange, onSubmit, task, isLoading = false }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>(STATUSES[0]);

  useEffect(() => {
    if (task) {
      const taskWithStatus = task as TaskWithStatus;
      setTitle(task.title);
      setDescription(task.description);
      setSelectedStatus(
        STATUSES.find((s) => s.value === taskWithStatus.status) || STATUSES[0]
      );
    } else {
      setTitle('');
      setDescription('');
      setSelectedStatus(STATUSES[0]);
    }
  }, [task, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim(), description.trim(), selectedStatus.value);
    if (!task) {
      setTitle('');
      setDescription('');
      setSelectedStatus(STATUSES[0]);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isLoading) {
      setTitle('');
      setDescription('');
      setSelectedStatus(STATUSES[0]);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              type="text"
              placeholder="Digite o título da tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Digite uma descrição (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Popover open={statusPopoverOpen} onOpenChange={setStatusPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                  {selectedStatus ? <>{selectedStatus.label}</> : <>+ Selecionar status</>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="right" align="start">
                <Command>
                  <CommandInput placeholder="Buscar status..." />
                  <CommandList>
                    <CommandEmpty>Nenhum status encontrado.</CommandEmpty>
                    <CommandGroup>
                      {STATUSES.map((status) => (
                        <CommandItem
                          key={status.value}
                          value={status.value}
                          onSelect={(value) => {
                            setSelectedStatus(
                              STATUSES.find((s) => s.value === value) || STATUSES[0]
                            );
                            setStatusPopoverOpen(false);
                          }}
                        >
                          {status.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!title.trim() || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                task ? 'Atualizar' : 'Criar'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}