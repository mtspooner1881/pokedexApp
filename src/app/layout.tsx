import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import QueryProvider from './QueryProvider';
import './globals.css';
import { VT323 } from 'next/font/google';

const vt323 = VT323({
  subsets: ['latin'],
  display: 'swap', 
  weight: ['400'],
  variable: '--font-vt323'
});

export const metadata: Metadata = {
  title: 'Code Challenge Pokedex',
  description: 'Created by Mark Spooner',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <Suspense>
      <html lang="en">
        <body className={`${vt323.variable} antialiased`}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </body>
      </html>
    </Suspense>
  );
}
