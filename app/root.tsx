import Header from '~/components/Header';
import styles from '~/styles/main.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createHead } from 'remix-island';

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: styles }
];

const theme = extendTheme({
  colors: {
    ea: {
      blue: "#00239c",
    },
  },
})

export const Head = createHead(() => (
  <>
    <Meta />
    <Links />
  </>
));


// function Document({
//   children,
//   title = "App title",
// }: {
//   children: React.ReactNode;
//   title?: string;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <Meta />
//           <meta name="viewport" content="width=device-width,initial-scale=1" charSet="UTF-8"/>
//           <title>{title}</title>
//         <Links />
//       </head>
//       <body>
//         <Header/>
//         {children}
//         <ScrollRestoration />
//         <Scripts />
//         <LiveReload />
//       </body>
//     </html>
//   );
// }

function Document({
  children,
  title = "App title",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <>
      <Head />
      <Header />
      { children }
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </>
  );
}

export default function App() {
  // throw new Error("💣💥 Booooom");

  return (
    <Document>
      <ChakraProvider theme={ theme } >
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}