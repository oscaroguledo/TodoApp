import { ThemeProvider } from '@/contexts/ThemeContext';
import { App } from './App';

export function ThemedApp() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
