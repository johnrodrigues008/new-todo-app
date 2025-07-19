'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/forms/AuthForm';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard');
      toast.success('Login realizado com sucesso!', { duration: 800 });
    } catch {
      toast.error('Usuário ou senha inválidos');
    }
  };

  return (
    <AuthForm
      title="Entrar"
      description="Digite suas credenciais para acessar sua conta"
      buttonLabel="Entrar"
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
      footer={
        <p className="text-center text-muted-foreground">
          Não tem uma conta?{' '}
          <Button variant="link" className="p-0 h-auto cursor-pointer" onClick={() => router.push('/register')}>
            Criar conta
          </Button>
        </p>
      }
    />
  );
}
