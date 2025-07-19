'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/forms/AuthForm';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/dashboard');
    } else {
      setChecked(true);
    }
  }, [router]);

  const handleLogin = async (email: string, password: string) => {
    setError('');
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!', { duration: 800 });
      router.push('/dashboard');
    } catch {
      toast.error('Usuário ou senha inválidos');
    }
  };

  if (!checked) return null;

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
