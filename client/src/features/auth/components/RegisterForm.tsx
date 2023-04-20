import { useMutation } from '@tanstack/react-query';
import { PersonaAuthResponse, UserRegisterRequest, registerUser } from '../api';
import { useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

type RegisterFormProps = {
  registerPersona: (data: UserRegisterRequest) => Promise<PersonaAuthResponse>;
  onSuccess: (response: PersonaAuthResponse) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
}: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  const [personalNumber, setPersonalNumber] = useState('');

  const useRegister = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => onSuccess(data),
  });

  const errorMessage = 'Invalid credentials, please try again';

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        className="mx-5 flex w-full max-w-lg flex-col gap-y-4 rounded bg-white p-8 shadow md:w-1/2"
        onSubmit={(e) => {
          e.preventDefault();

          useRegister.mutate({
            email,
            password,
            firstname,
            lastname,
            personalNumber,
            referenceLinks: [referenceLink],
          });
        }}
      >
        <Input
          label="Email"
          type={'email'}
          required
          disabled={useRegister.isLoading}
          value={email}
          onChange={setEmail}
        />
        <Input
          label="Password"
          type={'password'}
          required
          disabled={useRegister.isLoading}
          value={password}
          onChange={setPassword}
        />
        <Input
          label="Firstname"
          type={'text'}
          required
          disabled={useRegister.isLoading}
          value={firstname}
          onChange={setFirstname}
        />
        <Input
          label="Lastname"
          type={'text'}
          required
          disabled={useRegister.isLoading}
          value={lastname}
          onChange={setLastname}
        />
        <Input
          label="Reference Link"
          type={'text'}
          required
          disabled={useRegister.isLoading}
          value={referenceLink}
          onChange={setReferenceLink}
        />
        <Input
          label="Personal number"
          type={'string'}
          required
          disabled={useRegister.isLoading}
          value={personalNumber}
          onChange={setPersonalNumber}
        />
        {useRegister.isError && (
          <p className="relative rounded border border-red-400 bg-red-100 px-3 py-1 text-xs text-red-700">
            {errorMessage}
          </p>
        )}

        <Button type="submit" disabled={useRegister.isLoading}>
          {!useRegister.isLoading ? 'Submit' : 'Loading...'}
        </Button>
      </form>
    </div>
  );
};
