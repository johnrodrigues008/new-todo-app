'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface AuthFormProps {
  title: string;
  description: string;
  buttonLabel: string;
  onSubmit: (email: string, password: string) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
  footer?: React.ReactNode;
  prependFields?: React.ReactNode;
  appendFields?: React.ReactNode;
}

export function AuthForm({
  title,
  description,
  buttonLabel,
  onSubmit,
  isLoading = false,
  error = '',
  footer,
  prependFields,
  appendFields,
}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await onSubmit(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {prependFields}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {appendFields}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {buttonLabel}...
                </>
              ) : (
                buttonLabel
              )}
            </Button>
            {footer}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
