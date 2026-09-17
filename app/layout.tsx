import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Light of the Piazza — An Advent Journey',
  description:
    'An interactive 24-day Advent calendar set in an illustrated European piazza at dusk. A new moment of hope awaits each day.',
};

export const viewport: Viewport = {
  themeColor: '#10233f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-calm="false" data-contrast="normal">
      <body>{children}</body>
    </html>
  );
}
