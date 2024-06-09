import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { kenwave, libre_barcode_39, pacifico } from "@/styles/font";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe",
  description: "Portfolio & Dev recipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          pacifico.variable,
          libre_barcode_39.variable,
          kenwave.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="recipe-theme"
        >
          <QueryProvider>
            <div
              className="h-full w-full bg-background text-primary"
              style={{ backgroundImage: "var(--background-image)" }}
            >
              {children}
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
