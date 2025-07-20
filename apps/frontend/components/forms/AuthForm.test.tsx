import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthForm } from "./AuthForm";

describe("AuthForm", () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza título, descrição e botão", () => {
    render(
      <AuthForm
        title="Login"
        description="Faça seu login"
        buttonLabel="Entrar"
        onSubmit={onSubmitMock}
      />
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Faça seu login")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("chama onSubmit com email e senha corretos", async () => {
    render(
      <AuthForm
        title="Login"
        description="Faça seu login"
        buttonLabel="Entrar"
        onSubmit={onSubmitMock}
      />
    );

    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/senha/i);
    const btnSubmit = screen.getByRole("button", { name: /entrar/i });

    await userEvent.type(inputEmail, "usuario@example.com");
    await userEvent.type(inputPassword, "123456");

    await act(async () => {
      await userEvent.click(btnSubmit);
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith("usuario@example.com", "123456");
  });

  it("não chama onSubmit se email ou senha estiver vazio", async () => {
    render(
      <AuthForm
        title="Login"
        description="Faça seu login"
        buttonLabel="Entrar"
        onSubmit={onSubmitMock}
      />
    );

    const btnSubmit = screen.getByRole("button", { name: /entrar/i });

    // Tenta enviar sem preencher email e senha
    await act(async () => {
      await userEvent.click(btnSubmit);
    });
    expect(onSubmitMock).not.toHaveBeenCalled();

    // Preenche só email
    const inputEmail = screen.getByLabelText(/email/i);
    await userEvent.type(inputEmail, "usuario@example.com");
    await act(async () => {
      await userEvent.click(btnSubmit);
    });
    expect(onSubmitMock).not.toHaveBeenCalled();

    // Limpa email e preenche só senha
    await userEvent.clear(inputEmail);
    const inputPassword = screen.getByLabelText(/senha/i);
    await userEvent.type(inputPassword, "123456");
    await act(async () => {
      await userEvent.click(btnSubmit);
    });
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("exibe mensagem de erro quando passada por props", () => {
    render(
      <AuthForm
        title="Login"
        description="Faça seu login"
        buttonLabel="Entrar"
        onSubmit={onSubmitMock}
        error="Erro de autenticação"
      />
    );

    expect(screen.getByText("Erro de autenticação")).toBeInTheDocument();
  });

  it("desabilita inputs e botão quando isLoading for true", () => {
    render(
      <AuthForm
        title="Login"
        description="Faça seu login"
        buttonLabel="Entrando"
        onSubmit={onSubmitMock}
        isLoading={true}
      />
    );

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/senha/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /entrando/i })).toBeDisabled();
  });
});
