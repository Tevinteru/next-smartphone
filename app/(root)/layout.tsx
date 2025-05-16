import { Footer, Header } from '@/shared/components/shared';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Smartphone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Этот div обеспечит липкий футер
    <div className="flex flex-col min-h-screen">
      <Suspense>
        <Header />
      </Suspense>

      {/* Контент займет всё оставшееся место */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
