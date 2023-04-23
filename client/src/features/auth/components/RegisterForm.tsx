import { useMutation } from '@tanstack/react-query';
import { PersonaAuthResponse, UserRegisterRequest, UserRole } from '../api';
import { useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { SelectUserRoleInput } from './SelectUserRoleInput';
import { TextArea } from '@/components/TextArea';
import { useAuth } from '@/hooks/useAuth';

type RegisterFormProps = {
  registerPersona: (data: UserRegisterRequest) => Promise<PersonaAuthResponse>;
  onSuccess: (response: PersonaAuthResponse) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
}: RegisterFormProps) => {
  const { userRegister } = useAuth();
  const [user, setUser] = useState<{
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    referenceLink: string;
    personalNumber: string;
    role?: UserRole;
    phoneNumber?: string;
    description?: string;
  }>({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    referenceLink: '',
    personalNumber: '',
    role: undefined,
    phoneNumber: '',
    description: '',
  });

  const useRegister = useMutation({
    mutationFn: userRegister,
    onSuccess: (data) => onSuccess(data),
  });

  const errorMessage = useRegister.isError
    ? (useRegister.error as Error).message
    : '';
  const isVolunteerUser =
    user.role === UserRole.Volunteer || user.role === UserRole.Both;

  return (
    <form
      className="mx-5 flex w-full max-w-lg flex-col gap-y-4 rounded bg-white p-8 shadow md:w-1/2"
      onSubmit={(e) => {
        e.preventDefault();

        const { referenceLink, ...data } = user;
        useRegister.mutate({
          ...data,
          role: data.role ?? UserRole.Beneficiary,
          referenceLinks: [referenceLink],
        });
      }}
    >
      <div className="grid grid-cols-2 gap-2">
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
      </div>
      <div className="grid grid-cols-2 gap-2">
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
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Reference Link"
          hint="Your social media links will be used to help verify your identity"
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
          hint="This information will be used for verification purposes only"
          type={'string'}
          required
          disabled={useRegister.isLoading}
          value={user.personalNumber}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, personalNumber: value }));
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <SelectUserRoleInput
          hint="You can register as a volunteer and get assistance with the same account"
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
          hint="Phone number will be used to contact you in case you select volunteer role"
          required={isVolunteerUser}
          disabled={useRegister.isLoading}
          value={user.phoneNumber}
          onChange={(value: string) => {
            setUser((prevState) => ({ ...prevState, phoneNumber: value }));
          }}
        />
      </div>
      <TextArea
        hint="Feel free to write anything you would like to share about yourself or your experience, this will help us in verification process"
        label="Tell us a little bit about yourself"
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
  );
};
