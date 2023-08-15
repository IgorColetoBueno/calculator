import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Calculator",
  description: "A simple calculator application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={twMerge(poppins.className, "h-full bg-gray-900")}>{children}</body>
    </html>
  );
}
