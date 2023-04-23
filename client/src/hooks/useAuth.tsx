import {
  PersonaCredentials,
  PersonaLoginRequest,
  fetchPersona,
  loginUser,
  loginAdmin,
  registerUser,
  UserRegisterRequest,
  PersonaAuthResponse,
} from '@/features/auth/api';
import { useContext, useState, createContext } from 'react';

type AuthContextType = {
  loadPersona?: () => Promise<PersonaCredentials>;
  userLogin?: (
    credentials: PersonaLoginRequest,
  ) => Promise<PersonaAuthResponse>;
  adminLogin?: (
    credentials: PersonaLoginRequest,
  ) => Promise<PersonaAuthResponse>;
  userRegister?: (
    credentials: UserRegisterRequest,
  ) => Promise<PersonaAuthResponse>;
  logout?: () => void;
  isLoading?: boolean;
  error?: Error;
  persona: PersonaCredentials | null;
};

const AuthContext = createContext<AuthContextType>({
  persona: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [persona, setPersona] = useState<PersonaCredentials | null>(null);
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const loadPersona = () => {
    setIsLoading(true);
    return fetchPersona()
      .then((persona) => {
        setPersona(persona);
        setIsLoading(false);
        return Promise.resolve(persona);
      })
      .catch((error) => {
        setError(error as Error);
        return Promise.reject(error);
      });
  };

  const userLogin = (credentials: PersonaLoginRequest) => {
    setIsLoading(true);
    return loginUser(credentials)
      .then(({ persona, token }) => {
        setPersona(persona);
        setIsLoading(false);
        return { persona, token };
      })
      .catch((error) => {
        setError(error as Error);
        return Promise.reject(error);
      });
  };
  const adminLogin = (credentials: PersonaLoginRequest) => {
    setIsLoading(true);
    return loginAdmin(credentials)
      .then(({ persona, token }) => {
        setPersona(persona);
        setIsLoading(false);
        return { persona, token };
      })
      .catch((error) => {
        setError(error as Error);
        return Promise.reject(error);
      });
  };

  const userRegister = (credentials: UserRegisterRequest) => {
    setIsLoading(true);
    return registerUser(credentials)
      .then(({ persona, token }) => {
        setPersona(persona);
        setIsLoading(false);
        return { persona, token };
      })
      .catch((error) => {
        setError(error as Error);
        return Promise.reject(error);
      });
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setPersona(null);
  };

  return {
    persona,
    loadPersona,
    userLogin,
    adminLogin,
    userRegister,
    logout,
    error,
    isLoading,
  } as AuthContextType;
}
