"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export const Breadcrumbs = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);

    return [
      { label: "Home", href: "/" },
      ...paths.map((path, index) => ({
        label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
        href: "/" + paths.slice(0, index + 1).join("/"),
      })),
    ];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index === 0 ? (
            <Link
              href={item.href}
              className="flex items-center hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Link
                href={item.href}
                className={`hover:text-foreground transition-colors ${
                  index === breadcrumbs.length - 1
                    ? "text-foreground font-medium"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            </>
          )}
        </div>
      ))}
    </nav>
  );
};
