import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";
import { cn } from "@/shared/lib/utils";
import { Toaster } from "@/shared/kit/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "A modern blog built with Next.js and shadcn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.className,
          "bg-gray-900 text-gray-100 flex flex-col min-h-screen"
        )}
      >
        <Header />
        <main className="main flex-grow">
          <div className="container mx-auto p-4">
            {children}
          </div>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
