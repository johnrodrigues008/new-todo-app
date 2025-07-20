import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskForm } from "./TaskForm";
import { Task } from "../../hooks/useTask";

describe("TaskForm", () => {
  const onOpenChange = jest.fn();
  const onSubmit = jest.fn();

  const taskExample: Task = {
    id_task: "1",
    title: "Tarefa Exemplo",
    description: "Descrição da tarefa exemplo",
    status: "IN_PROGRESS",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza título 'Nova Tarefa' quando não recebe task e está aberto", () => {
    render(
      <TaskForm open={true} onOpenChange={onOpenChange} onSubmit={onSubmit} />
    );
    expect(screen.getByRole("heading", { name: /nova tarefa/i })).toBeInTheDocument();
  });

  it("preenche os campos com os dados da task recebida", () => {
    render(
      <TaskForm open={true} onOpenChange={onOpenChange} onSubmit={onSubmit} task={taskExample} />
    );
    expect(screen.getByRole("textbox", { name: /título/i })).toHaveValue(taskExample.title);
    expect(screen.getByRole("textbox", { name: /descrição/i })).toHaveValue(taskExample.description);
    expect(screen.getByRole("button", { name: /em andamento/i })).toBeInTheDocument();
  });

  it("chama onOpenChange(false) ao clicar no botão cancelar", () => {
    render(
      <TaskForm open={true} onOpenChange={onOpenChange} onSubmit={onSubmit} />
    );
    const btnCancelar = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(btnCancelar);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("desabilita botões e inputs quando isLoading for true", () => {
    render(
      <TaskForm open={true} onOpenChange={onOpenChange} onSubmit={onSubmit} isLoading={true} />
    );
    expect(screen.getByRole("textbox", { name: /título/i })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: /descrição/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeDisabled();
    expect(screen.getByText(/salvando/i).closest("button")).toBeDisabled();
  });

  it("altera o título, descrição e status e chama onSubmit com dados corretos", async () => {
    render(
      <TaskForm open={true} onOpenChange={onOpenChange} onSubmit={onSubmit} />
    );

    const inputTitle = screen.getByRole("textbox", { name: /título/i });
    const inputDescription = screen.getByRole("textbox", { name: /descrição/i });
    const btnStatus = screen.getByRole("button", { name: /pendente/i });
    const btnSubmit = screen.getByRole("button", { name: /criar/i });

    await userEvent.type(inputTitle, "Nova tarefa");
    await userEvent.type(inputDescription, "Descrição nova");

    fireEvent.click(btnStatus);
    const optionConcluida = await screen.findByText("Concluída");
    fireEvent.click(optionConcluida);

    fireEvent.click(btnSubmit);

    expect(onSubmit).toHaveBeenCalledWith("Nova tarefa", "Descrição nova", "DONE");
  });

  it("não chama onSubmit se título estiver vazio", () => {
    render(
      <TaskForm open={true} onOpenChange={onOpenChange} onSubmit={onSubmit} />
    );
    const btnSubmit = screen.getByRole("button", { name: /criar/i });
    fireEvent.click(btnSubmit);
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
