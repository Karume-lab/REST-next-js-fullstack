import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  text: string;
  loadingText: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { text, loadingText, isLoading, className, children, icon, ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          icon && <div className="h-4 w-4">{icon}</div>
        )}
        <div>
          <span>{isLoading ? loadingText : text}</span>
        </div>
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
