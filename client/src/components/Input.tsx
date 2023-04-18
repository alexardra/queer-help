import { HTMLInputTypeAttribute, useCallback } from 'react';
import { default as MaterialTextField } from '@mui/material/TextField';

export type InputProps = {
  value: number | string;
  onChange: (event: { name: string; value: number | string }) => void;
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
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('---');
      const { name, value } = e.target;
      onChange({ name, value });
    },
    [onChange],
  );

  return (
    <MaterialTextField
      value={value}
      onChange={handleInputChange}
      id={id}
      name={name}
      label={label}
      type={type}
    />
  );
};
