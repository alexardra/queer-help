import { default as MaterialAppBar } from '@mui/material/AppBar';
import { default as MaterialToolbar } from '@mui/material/Toolbar';

export type HeaderProps = {
  children?: React.ReactNode;
  position: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  color: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent';
};

export const Header: React.FC<HeaderProps> = ({
  children,
  position,
  color,
}: HeaderProps) => {
  return (
    <MaterialAppBar position={position} color={color}>
      <MaterialToolbar>{children}</MaterialToolbar>
    </MaterialAppBar>
  );
};
