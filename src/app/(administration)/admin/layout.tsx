import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../globals.css';
import { ThemeProvider } from '@/app/components/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio | Admin',
  description:
    'Portfolio of Giura Ionut, a fullstack web developer specializing in modern web technologies.',
  openGraph: {
    title: 'Portfolio | Admin',
    description:
      'Portfolio of Giura Ionut, a fullstack web developer specializing in modern web technologies.',
    url: 'https://giuraionut.dev',
    siteName: 'Giura Ionut Portfolio',
    images: [
      {
        url: 'https://giuraionut.dev/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Giura Ionut Portfolio Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Giura Ionut',
    description:
      'Portfolio of Giura Ionut, a fullstack web developer specializing in modern web technologies.',
    images: ['https://giuraionut.dev/assets/og-image.png'],
    creator: '@giuraionut',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
