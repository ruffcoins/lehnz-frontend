import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/features/shared/providers/QueryProvider";
import { UserProvider } from "@/features/auth/context/UserContext";
import { Inter } from "next/font/google";
import Navbar from "@/features/home/components/Navbar";
import { Toaster } from "@/features/shared/ui/sonner";

export const metadata: Metadata = {
  title: "Pure Engineering | Engineering the Future of AI — One Guide at a Time",
  description:
    "Pure Engineering is where AI/ML engineers publish deep, practical guides on how models, systems, and ideas come to life — from concept to code.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <UserProvider>
            <Navbar />
            {children}
            <Toaster />
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
