import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';

import { mainTheme } from './app/themes/mainTheme.ts';
import App from './App.tsx';

import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={mainTheme}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
