import { UserHeader } from './UserHeader';

interface Props {
  children: React.ReactNode;
}

export const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <UserHeader></UserHeader>
      <main>{children}</main>
    </>
  );
};
