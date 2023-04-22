import { useQuery } from '@tanstack/react-query';
import { fetchAssistances } from '@/features/assistances/api';
import { AssistanceCard } from '@/features/assistances/components/AssistanceCard';
import { Button } from '@/components/Button';
import { Link, useNavigate } from 'react-router-dom';

export const Portal = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['assistances'],
    queryFn: fetchAssistances,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    // TODO
    return <div>Oops .. something went wrong</div>;
  }
  const { assistances, count } = data;

  return (
    <div className="mx-auto my-3 grid max-w-screen-lg grid-cols-1 gap-4">
      <div className="align-center flex justify-end">
        <Link to="/user/assistance/create">
          <Button variant="inverse">Get assistance</Button>
        </Link>
      </div>

      {count > 0 ? (
        assistances.map((assistance) => (
          <AssistanceCard key={assistance.id} assistance={assistance} />
        ))
      ) : (
        <h1>No assistance to browse for now</h1>
      )}
    </div>
  );
};
