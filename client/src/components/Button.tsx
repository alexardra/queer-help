import { default as MaterialButton } from '@mui/material/Button';

export type ButtonProps = {
  children?: React.ReactNode;
  type?: 'submit';
  variant?: 'text' | 'outlined' | 'contained';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  size?: 'small' | 'medium' | 'large';
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
}: ButtonProps) => {
  return (
    <MaterialButton type={type} variant={variant} color={color} size={size}>
      {children}
    </MaterialButton>
  );
};
