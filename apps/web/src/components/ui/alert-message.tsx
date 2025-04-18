import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { FadeIn } from "./motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  HelpCircle,
} from "lucide-react";

export type AlertType = 
  | "info" 
  | "success" 
  | "warning" 
  | "error" 
  | "help" 
  | "default";

export interface AlertMessageProps {
  /**
   * The title of the alert
   */
  title: string;
  
  /**
   * The description or content of the alert
   */
  description: string;
  
  /**
   * The type of alert to display
   * @default "info"
   */
  type?: AlertType;
  
  /**
   * Optional custom icon to override the default icon for the alert type
   */
  icon?: LucideIcon;
  
  /**
   * Optional CSS class name for styling the alert
   */
  className?: string;
  
  /**
   * Whether to animate the alert with a fade-in effect
   * @default true
   */
  fadeIn?: boolean;
  
  /**
   * Delay in seconds before the fade-in animation starts
   * @default 0
   */
  fadeInDelay?: number;
  
  /**
   * Whether to show the icon
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Optional action element to display at the bottom of the alert
   */
  action?: React.ReactNode;
}

const alertTypeConfig = {
  info: {
    icon: Info,
    variant: "default" as const,
    className: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-300",
  },
  success: {
    icon: CheckCircle,
    variant: "default" as const,
    className: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/50 dark:border-green-800 dark:text-green-300",
  },
  warning: {
    icon: AlertTriangle,
    variant: "default" as const,
    className: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-300",
  },
  error: {
    icon: XCircle,
    variant: "destructive" as const,
    className: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300",
  },
  help: {
    icon: HelpCircle,
    variant: "default" as const,
    className: "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950/50 dark:border-purple-800 dark:text-purple-300",
  },
  default: {
    icon: AlertCircle,
    variant: "default" as const,
    className: "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-950/50 dark:border-gray-800 dark:text-gray-300",
  },
};

export function AlertMessage({
  title,
  description,
  type = "info",
  icon: CustomIcon,
  className,
  fadeIn = true,
  fadeInDelay = 0,
  showIcon = true,
  action,
}: AlertMessageProps) {
  const config = alertTypeConfig[type];
  const Icon = CustomIcon || config.icon;
  
  const alertContent = (
    <Alert 
      variant={config.variant} 
      className={cn(
        config.className,
        action && "pb-2",
        className
      )}
    >
      {showIcon && (
        <div className="flex items-center justify-center">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <div className="flex-1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {action && (
          <div className="mt-2 flex justify-end">
            {action}
          </div>
        )}
      </div>
    </Alert>
  );

  if (fadeIn) {
    return <FadeIn delay={fadeInDelay}>{alertContent}</FadeIn>;
  }

  return alertContent;
} 