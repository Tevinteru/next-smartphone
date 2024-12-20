import type { Metadata } from "next";

import { Header } from "@/shared/components/shared/header";

export const metadata: Metadata = {
  title: "Next Smartphone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header/>
      {children}
    </main>
  );
}
