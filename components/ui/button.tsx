import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container focus-visible:outline-primary",
  outline:
    "border border-primary text-primary hover:bg-surface-container-low focus-visible:outline-primary",
};

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  /** Render as the single child element instead of a <button>. */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-sm px-8 font-label-caps text-label-caps transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:pointer-events-none disabled:opacity-60",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
