import { default as MaterialButton } from '@mui/material/Button';

export type ButtonProps = {
  children?: React.ReactNode;
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
  variant = 'contained',
  color = 'primary',
  size = 'medium',
}: ButtonProps) => {
  return (
    <MaterialButton variant={variant} color={color} size={size}>
      {children}
    </MaterialButton>
  );
};
