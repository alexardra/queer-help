import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { Form } from 'react-router-dom';

import { loginUser } from '@/features/auth/api';
import { useMutation } from '@tanstack/react-query';

export const Login: React.FC = () => {
  const useLogin = useMutation({
    mutationFn: loginUser,
  });

  const errorMessage = useLogin.isError
    ? (useLogin.error as Error).message
    : '';

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Form
        className="mx-5 flex w-full max-w-lg flex-col gap-y-4 rounded bg-white p-8 shadow md:w-1/2"
        onSubmit={(values) => {
          console.log('onsubmit', values);
          // useLogin.mutate({ email, password });
        }}
      >
        <Input
          label="Email"
          type={'email'}
          required
          disabled={useLogin.isLoading}
        />
        <Input
          label="Password"
          type={'password'}
          required
          disabled={useLogin.isLoading}
        />
        {useLogin.isError && <p>Error occured {errorMessage}</p>}
        <Button type="submit">
          {!useLogin.isLoading ? 'Submit' : 'Loading...'}
        </Button>
      </Form>
    </div>
  );
};
