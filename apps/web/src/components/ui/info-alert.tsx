import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { FadeIn } from "./motion";
import { LucideIcon } from "lucide-react";

export interface InfoAlertProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
  fadeIn?: boolean;
  fadeInDelay?: number;
}

export function InfoAlert({
  title,
  description,
  icon: Icon,
  className,
  fadeIn = true,
  fadeInDelay = 0,
}: InfoAlertProps) {
  const alertContent = (
    <Alert variant="default" className={className}>
      <AlertTitle>
        {Icon && <Icon className="h-4 w-4" />} {title}
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );

  if (fadeIn) {
    return <FadeIn delay={fadeInDelay}>{alertContent}</FadeIn>;
  }

  return alertContent;
} 