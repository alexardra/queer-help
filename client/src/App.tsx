import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from '@/routes';

import './App.css';

const queryClilent = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClilent}>
        <RouterProvider router={BrowserRouter} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
