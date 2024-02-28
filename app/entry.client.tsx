/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useState, useMemo } from "react";
import { CacheProvider } from '@emotion/react'
import { hydrateRoot } from "react-dom/client";
import { ClientStyleContext } from './context';
//import createEmotionCache, { defaultCache } from './createEmotionCache';
import createEmotionCache from './createEmotionCache';


interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  //const [cache, setCache] = useState(defaultCache)
  const [cache, setCache] = useState(createEmotionCache());


  //function reset() {
  // setCache(createEmotionCache())
  //}
  const clientStyleContextValue = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    []
  );

  return (
    <ClientStyleContext.Provider value={ clientStyleContextValue }>
      <CacheProvider value={ cache }>{ children }</CacheProvider>
    </ClientStyleContext.Provider>
  )
}
startTransition(() => {
  hydrateRoot(
    // document,
    document.getElementById('root')!,
    <StrictMode>
      <ClientCacheProvider>
        <RemixBrowser />
      </ClientCacheProvider>
    </StrictMode>
  );
});
