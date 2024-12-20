import { Header } from "@/shared/components";

// app/product/layout.tsx
export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
       <div className="min-h-screen bg-[#f6f6f6]">
            {children}
          </div>
    );
  }
  