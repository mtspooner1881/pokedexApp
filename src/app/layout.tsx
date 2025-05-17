import type { Metadata } from 'next';
import QueryProvider from './QueryProvider';
import './globals.css';
import { VT323 } from 'next/font/google';

const nuntino = VT323({
  subsets: ['latin'], // Or other desired subsets
  display: 'swap', // Or 'block', 'fallback' depending on your needs
  weight: ['400'], // Or other desired weights
  variable: '--font-nunito', // Optional: Use a CSS variable for better performance
});

export const metadata: Metadata = {
  title: 'Code Challenge Pokedex',
  description: 'Created by Mark Spooner',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${nuntino.variable} antialiased`}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </body>
      </html>
  );
}
