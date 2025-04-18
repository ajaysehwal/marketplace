import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeleteDialogProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  trigger?: React.ReactNode;
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonClassName?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  useIconTrigger?: boolean;
  iconTooltip?: string;
  iconClassName?: string;
  iconSize?: "sm" | "md" | "lg";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteDialog({
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete this item.",
  onConfirm,
  trigger,
  buttonText = "Delete",
  buttonVariant = "destructive",
  buttonSize = "default",
  buttonClassName,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  disabled = false,
  className,
  useIconTrigger = false,
  iconTooltip = "Delete",
  iconClassName,
  iconSize = "md",
  open,
  onOpenChange,
}: DeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const isDialogOpen = open !== undefined ? open : isOpen;
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };

  const iconSizeMap = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const iconTrigger = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors",
              iconClassName
            )}
            disabled={disabled || isLoading}
            onClick={() => handleOpenChange(true)}
          >
            <Trash2 className={iconSizeMap[iconSize]} />
            <span className="sr-only">{iconTooltip}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{iconTooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const defaultTrigger = (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      className={cn(
        "flex items-center gap-2",
        buttonClassName
      )}
      disabled={disabled || isLoading}
      onClick={() => handleOpenChange(true)}
    >
      <Trash2 className="h-4 w-4" />
      {buttonText}
    </Button>
  );

  const finalTrigger = trigger || (useIconTrigger ? iconTrigger : defaultTrigger);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        {finalTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "Deleting..." : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
