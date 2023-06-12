'use client';
import { ApolloProvider } from '@apollo/client';
import { NextUIProvider } from '@nextui-org/react';
import { AppWrapper } from '../components/ui/AppWrapper';
import { useApollo } from '../hooks';
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
          </NextUIProvider>
        </body>
      </html>
    </ApolloProvider>
  );
}
