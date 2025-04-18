import { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import "../globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface DashboardLayoutProps {
  children: ReactNode;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APIs Hub - Dashboard",
  description: "Manage your APIs and subscriptions",
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-background`}
      >
        <Header />
        <ThemeProvider defaultTheme="light">
          <div className="flex h-[92vh] overflow-hidden">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto p-6">
                <div className="mb-6">
                  <Breadcrumbs />
                </div>
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
