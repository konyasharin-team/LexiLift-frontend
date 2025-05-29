/// <reference types="vite-plugin-pwa/client" />
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __WB_MANIFEST: import('workbox-build').ManifestEntry[];
};

precacheAndRoute(self.__WB_MANIFEST);
