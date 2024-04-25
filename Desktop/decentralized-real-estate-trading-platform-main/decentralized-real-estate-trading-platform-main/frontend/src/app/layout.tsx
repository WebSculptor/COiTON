import type { Metadata } from "next";
import { Noto_Sans as FontSans } from "next/font/google";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { site } from "@/constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "@/components/ui/sonner";
import AuthContextProvider from "@/context/authContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased flex flex-col",
            fontSans.variable
          )}>
          <Toaster />
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </AuthContextProvider>
  );
}
