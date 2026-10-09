import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[160px] w-full rounded-sm border border-outline-variant bg-surface-container-lowest px-3 py-2 font-body-md text-body-md leading-relaxed text-on-surface transition-colors",
      "placeholder:text-outline focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
      "disabled:cursor-not-allowed disabled:opacity-60",
      "aria-[invalid=true]:border-error aria-[invalid=true]:focus-visible:ring-error",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
