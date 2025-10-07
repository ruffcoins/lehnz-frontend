import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/features/shared/providers/QueryProvider";
import { Work_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Pure Engineering | The Gold Standard of AI Engineering",
  description:
    "Guides, patterns, and architectures vetted by industry engineers. Production-ready AI/ML content that helps you build the right way, every time.",
};

const worksans = Work_Sans({
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
      <body className={worksans.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
