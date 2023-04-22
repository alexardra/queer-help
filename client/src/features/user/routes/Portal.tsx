import { useQuery } from '@tanstack/react-query';
import { fetchAssistances } from '@/features/assistances/api';
import { AssistanceCard } from '@/features/assistances/components/AssistanceCard';
import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';
import { Spinner } from '@/components/Spinner';

export const Portal = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['assistances'],
    queryFn: fetchAssistances,
  });

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <Spinner></Spinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-y-4">
        <div className="">Oops.. Something went wront</div>
      </div>
    );
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
