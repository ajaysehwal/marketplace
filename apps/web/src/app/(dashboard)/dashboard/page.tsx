"use client";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { PageTransition } from "@/components/ui/motion";
import { Dashboard } from "@/components/dashboard/Home";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <DashboardSkeleton />;
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-6">
        <Dashboard />
      </div>
    </PageTransition>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
