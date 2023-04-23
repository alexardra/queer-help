import { useQuery } from '@tanstack/react-query';
import { fetchAssistances } from '@/features/assistances/api';
import { AssistanceCard } from '@/features/assistances/components/AssistanceCard';
import { Button } from '@/components/Button';
import { Link } from 'react-router-dom';
import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/features/auth/api';
import { Hint } from '@/components/Hint';

export const Portal = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['assistances'],
    queryFn: fetchAssistances,
  });
  const { persona } = useAuth();

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
    <div className="mx-auto my-3 grid max-w-screen-lg grid-cols-1 gap-4 divide-y-2">
      <div className="align-center mt-3 flex justify-end">
        {persona?.userRole === UserRole.Beneficiary ||
          (persona?.userRole === UserRole.Both && (
            <Link to="/user/assistance/create">
              <Button variant="inverse">Get assistance</Button>
            </Link>
          ))}
      </div>
      <div className="pt-3">
        <div className="mb-3 flex items-center">
          <h3 className="text-xl font-semibold tracking-wider text-purple-700">
            Browse assistances
          </h3>
          <Hint
            id="browse-assistances"
            text="You can choose any of those requests and get in touch if you think you can help"
          />
        </div>
        <div className="flex flex-col gap-y-3">
          {count > 0 ? (
            assistances.map((assistance) => (
              <AssistanceCard key={assistance.id} assistance={assistance} />
            ))
          ) : (
            <h1 className="text-gray-500">
              No assistances to browse for now :) You can check-in later
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
