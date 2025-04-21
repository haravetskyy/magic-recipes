import Header from '@/components/header';
import Nav from '@/components/nav';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Recipe App',
  description: 'Test assessment – the Recipe book (DevelopersToday)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased w-svw h-svh flex justify-center scroll-smooth`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="p-4 flex flex-col gap-4 container overflow-x-hidden">
            <Nav />
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
