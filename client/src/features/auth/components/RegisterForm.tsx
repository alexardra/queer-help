import { useMutation } from '@tanstack/react-query';
import {
  PersonaAuthResponse,
  UserRegisterRequest,
  UserRole,
  registerUser,
} from '../api';
import { useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { SelectUserRoleInput } from './SelectUserRoleInput';
import { TextArea } from '@/components/TextArea';

type RegisterFormProps = {
  registerPersona: (data: UserRegisterRequest) => Promise<PersonaAuthResponse>;
  onSuccess: (response: PersonaAuthResponse) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
}: RegisterFormProps) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    referenceLink: '',
    personalNumber: '',
    role: UserRole.Beneficiary,
    phoneNumber: '',
    description: '',
  });

  const useRegister = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => onSuccess(data),
  });

  const errorMessage = 'Invalid credentials, please try again';

  const isVolunteerUser =
    user.role === UserRole.Volunteer || user.role === UserRole.Both;

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form
        className="mx-5 flex w-full max-w-lg flex-col gap-y-4 rounded bg-white p-8 shadow md:w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          const { referenceLink, ...data } = user;
          useRegister.mutate({
            ...data,
            referenceLinks: [referenceLink],
          });
        }}
      >
        <Input
          label="Email"
          type={'email'}
          required
          disabled={useRegister.isLoading}
          value={user.email}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, email: value }));
          }}
        />
        <Input
          label="Password"
          type={'password'}
          required
          disabled={useRegister.isLoading}
          value={user.password}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, password: value }));
          }}
        />
        <Input
          label="Firstname"
          type={'text'}
          required
          disabled={useRegister.isLoading}
          value={user.firstname}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, firstname: value }));
          }}
        />
        <Input
          label="Lastname"
          type={'text'}
          required
          disabled={useRegister.isLoading}
          value={user.lastname}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, lastname: value }));
          }}
        />
        <Input
          label="Reference Link"
          type={'url'}
          required
          disabled={useRegister.isLoading}
          value={user.referenceLink}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, referenceLink: value }));
          }}
        />
        <Input
          label="Personal number"
          type={'string'}
          required
          disabled={useRegister.isLoading}
          value={user.personalNumber}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, personalNumber: value }));
          }}
        />
        <SelectUserRoleInput
          required
          disabled={useRegister.isLoading}
          value={user.role}
          onChange={(value: number) => {
            setUser((prevState) => ({ ...prevState, role: value }));
          }}
        />
        <Input
          label="Phone number"
          type={'string'}
          required={isVolunteerUser}
          disabled={useRegister.isLoading}
          value={user.phoneNumber}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, phoneNumber: value }));
          }}
        />
        <TextArea
          value={user.description}
          required={isVolunteerUser}
          disabled={useRegister.isLoading}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, description: value }));
          }}
        />
        {useRegister.isError && (
          <p className="relative rounded border border-red-400 bg-red-100 px-3 py-1 text-xs text-red-700">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={useRegister.isLoading}
          isLoading={useRegister.isLoading}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};
