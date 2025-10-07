import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/features/shared/providers/QueryProvider";
import { Work_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Lehnz",
  description: "Lehnz application",
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
