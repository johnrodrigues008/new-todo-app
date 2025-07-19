'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AuthForm } from '@/components/forms/AuthForm';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      await register(email, password);
      router.push('/login');
      toast.success('Cadastro realizado com sucesso!', { duration: 1200 });
    } catch {
      toast.error('Erro ao criar conta. Tente novamente.');

    }
  };

  return (
    <AuthForm
      title="Criar Conta"
      description="Preencha os dados para criar sua conta"
      buttonLabel="Criar Conta"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      appendFields={
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Digite a senha novamente"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
      }
      footer={
        <p className="text-center text-muted-foreground">
          Já tem uma conta?{' '}
          <Link href="/login">
            <Button variant="link" className="p-0 h-auto cursor-pointer">
              Fazer login
            </Button>
          </Link>
        </p>
      }
    />

  );
}
