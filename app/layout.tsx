import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mathematical Threads',
  description: 'Explore mathematical ideas through stories, play and puzzles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
