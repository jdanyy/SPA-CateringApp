import { CssBaseline } from '@mui/material';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from './query/config/queryConfig';

import AppRoutes from './components/AppRoutes';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageProvider';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <LanguageProvider>
            <ThemeProvider>
              <CssBaseline enableColorScheme />
              <NavBar />
              <AppRoutes />
            </ThemeProvider>
          </LanguageProvider>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
