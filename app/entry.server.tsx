/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.server
 */
import { PassThrough } from "stream";

//import createEmotionCache from "@emotion/cache";
import createEmotionCache from './createEmotionCache';
import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import type { EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { renderHeadToString } from 'remix-island';
import { Head } from './root';

const ABORT_DELAY = 5000;

const handleRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  //loadContext: AppLoadContext,
) =>
  isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext,
    )
    : handleBrowserRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext,
    );
export default handleRequest;

const handleBotRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) =>
  new Promise((resolve, reject) => {
    let didError = false;
    const emotionCache = createEmotionCache();

    const { pipe, abort } = renderToPipeableStream(
      <EmotionCacheProvider value={ emotionCache }>
        <RemixServer context={ remixContext } url={ request.url } abortDelay={ ABORT_DELAY } />
      </EmotionCacheProvider>,
      {
        onAllReady: () => {
          const head = renderHeadToString({ request, remixContext, Head });
          const reactBody = new PassThrough();
          const emotionServer = createEmotionServer(emotionCache);


          const bodyWithStyles = emotionServer.renderStylesToNodeStream();
          reactBody.pipe(bodyWithStyles);

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("Cache-Control", "no-cache")
          responseHeaders.set("X-Content-Type-Options", "nosniff")

          resolve(
            new Response(reactBody, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          reactBody.write(
            `<!DOCTYPE html><html><head>${head}</head><body><div id="root">`,
          );
          pipe(reactBody);
          reactBody.write(`</div></body></html>`);

        },
        onShellError: (error: unknown) => {
          reject(error);
        },
        onError: (error: unknown) => {
          didError = true;

          console.error(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });

const handleBrowserRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) =>
  new Promise((resolve, reject) => {
    let didError = false;
    const emotionCache = createEmotionCache();

    const { pipe, abort } = renderToPipeableStream(
      <EmotionCacheProvider value={ emotionCache }>
        <RemixServer context={ remixContext } url={ request.url } abortDelay={ ABORT_DELAY } />
      </EmotionCacheProvider>,
      {
        onShellReady: () => {
          const head = renderHeadToString({ request, remixContext, Head });
          const reactBody = new PassThrough();
          const emotionServer = createEmotionServer(emotionCache);

          const bodyWithStyles = emotionServer.renderStylesToNodeStream();
          reactBody.pipe(bodyWithStyles);

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("Cache-Control", "no-cache")
          responseHeaders.set("x-content-type-options", "nosniff")

          resolve(
            new Response(reactBody, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );
          reactBody.write(
            `<!DOCTYPE html><html><head>${head}</head><body><div id="root">`,
          );
          pipe(reactBody);
          reactBody.write(`</div></body></html>`);
        },
        onShellError: (error: unknown) => {
          reject(error);
        },
        onError: (error: unknown) => {
          didError = true;

          console.error(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });