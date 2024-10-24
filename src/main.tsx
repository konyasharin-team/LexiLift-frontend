import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { store } from '@store/store.ts';

import { mainTheme } from '@themes/mainTheme.ts';
import App from './App.tsx';

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@styles/app.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider theme={mainTheme}>
          <App />
          <Notifications />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
