import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap",
  },
  {
    rel: "icon",
    href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M21.5,5.5C20.393,5.5 19.5,6.393 19.5,7.5L19.5,8.5L4.5,8.5L4.5,7.5C4.5,6.393 3.607,5.5 2.5,5.5C1.393,5.5 0.5,6.393 0.5,7.5L0.5,16.5C0.5,17.607 1.393,18.5 2.5,18.5C3.607,18.5 4.5,17.607 4.5,16.5L4.5,15.5L19.5,15.5L19.5,16.5C19.5,17.607 20.393,18.5 21.5,18.5C22.607,18.5 23.5,17.607 23.5,16.5L23.5,7.5C23.5,6.393 22.607,5.5 21.5,5.5M19.5,13.5L4.5,13.5L4.5,10.5L19.5,10.5L19.5,13.5Z'/%3E%3C/svg%3E",
    type: "image/svg+xml",
  },
];

// Error boundary component
export function ErrorBoundary() {
  const error = useRouteError();
  
  let errorMessage = "Si è verificato un errore inaspettato.";
  let statusCode = 500;
  
  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.data?.message || `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Errore - Sneaker Advisor</title>
      </head>
      <body className="h-full">
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {statusCode === 404 ? "Pagina non trovata" : "Si è verificato un errore"}
            </h1>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <a
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Torna alla home
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <html lang="en" className={isHomePage ? "bg-black" : ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={isHomePage ? "bg-black" : ""}>
        {children}
        {!isHomePage && (
          <footer className="text-center p-4 text-xs text-gray-500 border-t mt-auto">
            <p>© {new Date().getFullYear()} Sneaker Advisor • Version 1.0.0</p>
            <p className="mt-1">
              <a href="/privacy" className="underline hover:text-gray-700">Privacy</a> • 
              <a href="/terms" className="underline hover:text-gray-700 ml-2">Termini di servizio</a>
            </p>
          </footer>
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
