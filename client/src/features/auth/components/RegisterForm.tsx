import { useMutation } from '@tanstack/react-query';
import { PersonaAuthResponse, UserRegisterRequest, registerUser } from '../api';
import { useState } from 'react';
import { Input } from '@/components/Input';

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
  const [referenceLinks, setReferenceLinks] = useState([]);
  const [personalNumber, setPersonalNumber] = useState();

  const useRegister = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => onSuccess(data),
  });

  const errorMessage = useRegister.isError
    ? (useRegister.error as Error).message
    : '';

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        className="mx-5 flex w-full max-w-lg flex-col gap-y-4 rounded bg-white p-8 shadow md:w-1/2"
        onSubmit={(e) => {
          e.preventDefault();

          if (!personalNumber) return;

          useRegister.mutate({
            email,
            password,
            firstname,
            lastname,
            personalNumber,
            referenceLinks: referenceLinks.join('\n'),
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
        {/* <!-- reference links here - -> */}
        <Input
          label="Personal number"
          type={'number'}
          required
          disabled={useRegister.isLoading}
          value={personalNumber}
          onChange={setPersonalNumber}
        />
      </form>
    </div>
  );
};
