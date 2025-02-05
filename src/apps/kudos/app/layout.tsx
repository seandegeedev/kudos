import { geistSans } from '@/app/ui/font/font';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kudos',
  description: 'Kudos - by Sintrex',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>{children}</body>
    </html>
  );
}
