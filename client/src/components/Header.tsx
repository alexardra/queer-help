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
  return <header>{children}</header>;
};
