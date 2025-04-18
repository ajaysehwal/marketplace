"use client";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { ColorPaletteSelector } from "@/components/theme/ColorPaletteSelector";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export const Header = () => {
  const { user } = useAuth();
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur h-[8vh]">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <div className="from-primary to-accent text-primary-foreground flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br font-bold">
              A
            </div>
            <h1 className="ml-2 text-xl font-bold">API Hub</h1>
          </Link>

          <nav className="hidden items-center space-x-4 md:flex">
            <Link
              href="/hub"
              className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
            >
              Browse APIs
            </Link>
            <Link
              href="#"
              className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              href="#"
              className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors"
            >
              Documentation
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <ColorPaletteSelector />
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            {user ? (
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};
