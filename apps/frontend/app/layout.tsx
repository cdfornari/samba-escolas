'use client';
import { NextUIProvider } from '@nextui-org/react';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { AppWrapper } from '../components/ui/AppWrapper';
import { useApollo } from '../hooks';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <html lang="en" className="h-screen">
        <body className="h-full">
          <NextUIProvider>
            <AppWrapper>{children}</AppWrapper>
            <ToastContainer />
          </NextUIProvider>
        </body>
      </html>
    </ApolloProvider>
  );
}
