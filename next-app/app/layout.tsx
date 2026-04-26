import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weekly Vocabulary Adventure",
  description: "A gamified vocabulary learning application for grades 1-5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className + " min-h-full flex flex-col"}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
