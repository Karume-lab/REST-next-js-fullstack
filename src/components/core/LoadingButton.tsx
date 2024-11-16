import React from "react";
import { Button, ButtonProps } from "../ui/button";
import Loader from "../ui/Loader";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  text: string;
  loadingText: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  text,
  disabled,
  loadingText,
  className,
  type,
  variant,
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      disabled={disabled}
      className={cn(
        "flex items-center space-x-2 transition-all duration-300",
        disabled ? "cursor-not-allowed" : "text-white",
        className
      )}
    >
      {disabled && <Loader />}
      <span>{disabled ? `${loadingText} ...` : text}</span>
    </Button>
  );
};

export default LoadingButton;
