import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  Layers,
  BarChart,
  Key,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  // Define navigation items based on user role
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      roles: ["buyer", "seller", "admin"],
    },
    {
      title: "My APIs",
      href: "/dashboard/my-apis",
      icon: <Package className="h-5 w-5" />,
      roles: ["seller", "admin"],
    },
    {
      title: "Subscriptions",
      href: "/dashboard/subscriptions",
      icon: <ShoppingCart className="h-5 w-5" />,
      roles: ["buyer", "admin"],
    },
    {
      title: "API Keys",
      href: "/dashboard/api-keys",
      icon: <Key className="h-5 w-5" />,
      roles: ["buyer", "admin"],
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart className="h-5 w-5" />,
      roles: ["seller", "buyer"],
    },
    {
      title: "All APIs",
      href: "/dashboard/all-apis",
      icon: <Layers className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      roles: ["buyer", "seller", "admin"],
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.app_metadata.role)
  );

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const getInitials = () => {
    if (!user?.user_metadata.username) return "U";
    return user.user_metadata.username
      .split(" ")
      .map((n: any[]) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/signin");
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Mobile header */}
      <header className="flex h-16 items-center justify-between border-b px-4 lg:hidden">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <span className="ml-2 text-lg font-bold">API Hub</span>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={user?.user_metadata.avatar_url || ""}
            alt="Avatar"
          />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 transform flex-col bg-card shadow-lg transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 lg:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">API Hub</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {filteredNavItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start")}
                  onClick={() => {
                    router.push(item.href);
                    closeSidebar();
                  }}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                src={user?.user_metadata.avatar_url || ""}
                alt="Avatar"
              />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">
                {user?.user_metadata.username || user?.email}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.app_metadata.role}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn("flex-1 overflow-y-auto", sidebarOpen ? "lg:pl-64" : "")}
      >
        <div className="container mx-auto p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
