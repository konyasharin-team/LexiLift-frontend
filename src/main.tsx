import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { mainTheme } from './app/themes/mainTheme.ts';
import App from './App.tsx';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={mainTheme}>
        <App />
        <Notifications />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);
