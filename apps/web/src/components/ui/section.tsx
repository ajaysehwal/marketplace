import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  action?: ReactNode;
}

export const Section = ({
  title,
  description,
  children,
  className,
  titleClassName,
  action,
}: SectionProps) => {
  return (
    <section className={cn("py-12", className)}>
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2
              className={cn(
                "text-2xl md:text-3xl font-bold tracking-tight",
                titleClassName
              )}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-muted-foreground max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {action && <div className="mt-4 md:mt-0">{action}</div>}
        </div>
        {children}
      </div>
    </section>
  );
};
