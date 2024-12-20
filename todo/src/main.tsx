import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

// import { ReactDOM.createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
