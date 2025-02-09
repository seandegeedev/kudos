import { urbanist } from '@/src/ui/font/font';

import type { Metadata } from 'next';

import '@/src/ui/style/main.scss';

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
      <body className={`${urbanist.variable}`}>{children}</body>
    </html>
  );
}
