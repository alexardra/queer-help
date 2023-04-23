import { ChangeEvent } from 'react';
import { UserRole } from '../api';
import { Hint } from '@/components/Hint';

type Props = {
  onChange: (value: UserRole) => void;
  value?: number;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
};

type UserRoleOptionType = 'Beneficiary' | 'Volunteer' | 'Both';

const UserRoleOptions = {
  Beneficiary: UserRole.Beneficiary,
  Volunteer: UserRole.Volunteer,
  Both: UserRole.Both,
};

export const SelectUserRoleInput: React.FC<Props> = (props: Props) => {
  const selected = props.value
    ? {
        [UserRole.Beneficiary]: 'Beneficiary',
        [UserRole.Volunteer]: 'Volunteer',
        [UserRole.Both]: 'Both',
      }[props.value]
    : undefined;

  return (
    <div className="flex flex-col items-start gap-y-1">
      <label htmlFor="role" className="block text-sm font-bold text-gray-700">
        Desired role
        {props.hint && <Hint id={props.hint} text={props.hint} />}
      </label>
      <select
        id="role"
        name="role"
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        disabled={props.disabled}
        required={props.required}
        value={selected}
        onChange={(e: ChangeEvent) => {
          const selectedRole = (e.target as HTMLTextAreaElement)
            .value as UserRoleOptionType;
          props.onChange(UserRoleOptions[selectedRole]);
        }}
      >
        {props.value === undefined && <option />}
        {Object.keys(UserRoleOptions).map((key) => (
          <option key={`role-${key}`}>{key}</option>
        ))}
      </select>
    </div>
  );
};
