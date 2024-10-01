import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { mainTheme } from './app/themes/mainTheme.ts';
import App from './App.tsx';

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@styles/app.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={mainTheme}>
      <App />
      <Notifications />
    </MantineProvider>
  </StrictMode>,
);
