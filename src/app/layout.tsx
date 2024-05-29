import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Pancake from "../components/ui/Pancake";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import MobileNav from "../components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Pancake>
            <Navbar />
            <main className="px-4 py-4 mb-4 lg:py-0">{children}</main>
            <MobileNav />
          </Pancake>
        </ThemeProvider>
      </body>
    </html>
  );
}
