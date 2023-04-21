import useAuth from '@/hooks/useAuth';
import { AssistanceForm } from '../components/AssistanceForm';
import { useNavigate } from 'react-router-dom';

export const AssistanceCreate = () => {
  const navigate = useNavigate();
  // TODO: persona should exist here
  // persona.role PersonaRole.ADMIN | PersonaRole.USER
  // TODO: show additional fileds for admin
  // const { persona } = useAuth();
  // for now it is just for user

  return (
    <div className="mx-auto my-3 grid max-w-screen-lg grid-cols-1 gap-4">
      <AssistanceForm onSuccess={() => navigate(-1)} />
    </div>
  );
};
