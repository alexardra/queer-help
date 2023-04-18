import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { Form } from 'react-router-dom';

import {
  PersonaLoginRequest,
  PersonaLoginResponse,
  loginUser,
} from '@/features/auth/api';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
  const {
    mutate: login,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: loginUser,
  });
  return { login, isLoading, isError, isSuccess, error };
};

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, isError, isSuccess, error } = useLogin();

  console.log(
    'loading',
    isLoading,
    'error',
    isError,
    'success',
    isSuccess,
    error,
  );

  return (
    <Card>
      <Form
        onSubmit={() => {
          login({ email, password });
        }}
      >
        <Input
          label="Email"
          value={email}
          onChange={(e: { name: string; value: number | string }) => {
            setEmail(e.value as string);
          }}
          type={'email'}
        />
        <Input
          label="Password"
          value={password}
          onChange={(e: { name: string; value: number | string }) => {
            setPassword(e.value as string);
          }}
          type={'password'}
        />
        {isError && <p>Error occured {error.message}</p>}
        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  );
};
