import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Recipe App',
  description: 'Full-Stack JS engineer test assessment - the Recipe book (DevelopersToday)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased w-svw h-svh`}>{children}</body>
    </html>
  );
}
