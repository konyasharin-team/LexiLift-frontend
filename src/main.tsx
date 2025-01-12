// eslint-disable-next-line simple-import-sort/imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { store } from '@store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainTheme } from '@themes';
import { I18NContextProviderBase } from '@i18n';
import { NodesEditorsProvider } from '@modules/nodesEditor';

import App from './App.tsx';

// не трогать, важна последовательность
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@styles';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={mainTheme}>
            <NodesEditorsProvider>
              <I18NContextProviderBase>
                <App />
                <Notifications />
              </I18NContextProviderBase>
            </NodesEditorsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
