import { useQueryClient } from '@tanstack/react-query';
import { AssistanceForm } from '../components/AssistanceForm';
import { useNavigate } from 'react-router-dom';

export const AssistanceCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col items-center justify-center gap-y-3">
      <h3 className="flex text-center text-xl font-semibold tracking-wider text-purple-700">
        Create assistance and get help from trusted volunteers
      </h3>
      <AssistanceForm
        onSuccess={async () => {
          await queryClient.invalidateQueries({
            queryKey: ['assistances'],
            exact: true,
          });
          navigate(-1);
        }}
      />
    </div>
  );
};
