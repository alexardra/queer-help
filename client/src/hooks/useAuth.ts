import { fetchPersona } from '@/features/auth/api';
import { useQuery } from '@tanstack/react-query';

export default function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchPersona,
  });

  return { persona: !isLoading && !isError ? data : null };
}
