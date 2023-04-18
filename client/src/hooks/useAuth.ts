import { useQuery, QueryFunction } from '@tanstack/react-query';
import {
  PersonaLoginRequest,
  PersonaLoginResponse,
  loginUser,
} from '@/features/auth/api';

export function useLogin(credentials: PersonaLoginRequest) {
  const loginUserQueryFn: QueryFunction<
    PersonaLoginResponse,
    ['loginUser', PersonaLoginRequest]
  > = async ({ queryKey }) => {
    const credentials: PersonaLoginRequest = queryKey[1];
    const user = await loginUser(credentials);

    return user;
  };

  return useQuery(['loginUser', credentials], loginUserQueryFn);
}
