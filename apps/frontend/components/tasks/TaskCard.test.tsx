import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCard } from "./TaskCard";
import { Task } from "@/hooks/useTask";

jest.mock('@/components/ui/dropdown-menu', () => {
  return {
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuItem: ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
      <button onClick={onClick}>{children}</button>
    ),
  };
});

describe("TaskCard", () => {
  const task: Task = {
    id_task: "1",
    title: "Minha tarefa",
    description: "Descrição da tarefa",
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const onToggle = jest.fn();
  const onEdit = jest.fn();
  const onDelete = jest.fn();
  const onStatusChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza título, descrição, badge e data corretamente", () => {
    render(
      <TaskCard
        task={task}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    );

    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.description!)).toBeInTheDocument();

    const pendenteElements = screen.getAllByText("Pendente");
    expect(pendenteElements.length).toBeGreaterThan(0);

    expect(
      screen.getByText(new Date(task.createdAt).toLocaleDateString("pt-BR"))
    ).toBeInTheDocument();
  });

  it("checkbox reflete status DONE e chama onToggle ao clicar", () => {
    render(
      <TaskCard
        task={{ ...task, status: "DONE" }}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith(task.id_task);
  });

  it("chama onStatusChange ao mudar o select", () => {
    render(
      <TaskCard
        task={task}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "DONE" } });

    expect(onStatusChange).toHaveBeenCalledWith(task.id_task, "DONE");
  });

  it("chama onEdit e onDelete ao clicar nos itens do menu", () => {
    render(
      <TaskCard
        task={task}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    );

    fireEvent.click(screen.getByText("Editar"));
    expect(onEdit).toHaveBeenCalledWith(task);

    fireEvent.click(screen.getByText("Excluir"));
    expect(onDelete).toHaveBeenCalledWith(task);
  });
});
