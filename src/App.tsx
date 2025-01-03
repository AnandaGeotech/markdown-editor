import Router from './router';
import { ThemeProvider } from '@/common/components/theme-provider';
import { Toaster } from '@/common/components/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
