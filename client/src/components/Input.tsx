import { HTMLInputTypeAttribute } from 'react';
import { default as MaterialTextField } from '@mui/material/TextField';

export type InputProps = {
  value: number | string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  id?: string;
  name?: string;
  label?: string;
  type: HTMLInputTypeAttribute;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  id,
  name,
  label,
  type,
}: InputProps) => {
  return (
    <MaterialTextField
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      label={label}
      type={type}
    />
  );
};
