import { default as MaterialCard } from '@mui/material/Card';
import { default as MaterialCardContent } from '@mui/material/CardContent';

export const Card: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MaterialCard>
      <MaterialCardContent>{children}</MaterialCardContent>
    </MaterialCard>
  );
};
