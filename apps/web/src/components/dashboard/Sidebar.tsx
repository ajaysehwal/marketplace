"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart,
  Settings,
  Menu,
  Store,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlideIn } from "@/components/ui/motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the navigation item type
interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Define the navigation items
const navigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Package,
  },
  {
    title: "Upstreams",
    href: "/dashboard/upstreams",
    icon: Database,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function SidebarContent() {
  return (
    <ScrollArea className="h-full py-6">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  "transition-colors"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export function DashboardSidebar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  // Get user initials for avatar fallback
  const userInitials = user.email
    ? user.email.substring(0, 2).toUpperCase()
    : "U";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background">
        <SidebarContent />
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.email}</span>
              <span className="text-xs text-muted-foreground">Seller</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-50 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex h-16 items-center border-b px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Store className="h-6 w-6" />
              <span>Seller Dashboard</span>
            </Link>
          </div>
          <SlideIn>
            <SidebarContent />
          </SlideIn>
          <div className="mt-auto border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.email}</span>
                <span className="text-xs text-muted-foreground">Seller</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
