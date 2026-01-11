
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axiom Trade - Pulse",
  description: "Token Discovery Table",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "antialiased bg-background text-foreground overflow-hidden")}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
