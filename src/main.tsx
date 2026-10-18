import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './i18n/LanguageContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { AppErrorBoundary } from './components/AppErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <LanguageProvider>
        <WorkspaceProvider>
          <App />
        </WorkspaceProvider>
      </LanguageProvider>
    </AppErrorBoundary>
  </StrictMode>,
);

