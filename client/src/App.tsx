import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppRoutes } from '@/routes';
import { AuthProvider } from './hooks/useAuth';

import './App.css';

const queryClilent = new QueryClient({});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClilent}>
        <AuthProvider>
          <BrowserRouter>
            <ReactQueryDevtools />
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
