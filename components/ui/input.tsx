import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-sm border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-md text-body-md text-on-surface transition-colors",
        "placeholder:text-outline focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
        "disabled:cursor-not-allowed disabled:opacity-60",
        // Set by the Form field wrapper whenever that field has an error.
        "aria-[invalid=true]:border-error aria-[invalid=true]:focus-visible:ring-error",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
