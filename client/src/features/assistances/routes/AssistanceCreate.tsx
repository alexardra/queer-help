import { AssistanceForm } from '../components/AssistanceForm';
import { useNavigate } from 'react-router-dom';

export const AssistanceCreate = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto my-3 grid max-w-screen-lg grid-cols-1 gap-4">
      <AssistanceForm onSuccess={() => navigate(-1)} />
    </div>
  );
};
