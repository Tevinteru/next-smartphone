import { Header } from "@/shared/components";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
       <main className="min-h-screen bg-[#f6f6f6]">
            {children}
          </main>
    );
  }
  