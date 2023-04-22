import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useState } from 'react';

import { PersonaLoginRequest, PersonaAuthResponse } from '@/features/auth/api';
import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';

type LoginFormProps = {
  loginPersona: (
    credentials: PersonaLoginRequest,
  ) => Promise<PersonaAuthResponse>;
  onSuccess: (response: PersonaAuthResponse) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  loginPersona,
  onSuccess,
}: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const useLogin = useMutation({
    mutationFn: loginPersona,
    onSuccess: (data) => onSuccess(data),
  });

  const errorMessage = useLogin.isError
    ? (useLogin.error as Error).message
    : '';

  return (
    <form
      className="mx-5 flex w-full max-w-lg flex-col gap-y-4 rounded bg-white p-8 shadow md:w-1/2"
      onSubmit={(e) => {
        e.preventDefault();
        useLogin.mutate({ email, password });
      }}
    >
      <Input
        label="Email"
        type={'email'}
        required
        disabled={useLogin.isLoading}
        value={email}
        onChange={setEmail}
      />
      <Input
        label="Password"
        type={'password'}
        required
        disabled={useLogin.isLoading}
        value={password}
        onChange={setPassword}
      />
      {errorMessage && (
        <p className="relative rounded border border-red-400 bg-red-100 px-3 py-1 text-xs text-red-700">
          {errorMessage}
        </p>
      )}
      <Button
        type="submit"
        disabled={useLogin.isLoading}
        isLoading={useLogin.isLoading}
      >
        Log in
      </Button>
    </form>
  );
};
