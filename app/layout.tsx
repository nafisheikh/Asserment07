import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

import Navbar from '@/components/navbar';
import Providers from '@/components/providers';

export const metadata: Metadata = {
  title: 'বাজার দর — আজকের বাজার এক নজরে',
  description:
    'বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক জায়গায় দেখুন।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-scroll-behavior="smooth">
      <body>
        <Providers />

        <Navbar />

        {children}

        <footer className="site-footer">
          <div className="wrap footer-inner">
            <Link href="/" className="footer-brand">
              🛒 বাজার দর
            </Link>

            <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

            <p className="footer-note">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
