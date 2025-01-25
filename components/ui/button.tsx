import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "text-zinc-600 border-input bg-background bg-opacity-20 hover:text-accent-foreground",
        category:
          "border w-full text-black border-input bg-background hover:bg-zinc-200 hover:text-accent-foreground border-opacity-10",
        secondary: "bg-accent text-white hover:bg-secondary/80",
        secondaryTwo:
          "bg-zinc-800 col-start-3 h-9 rounded-[2px] px-3 text-zinc-600 border-input bg-background bg-opacity-20 hover:text-accent-foreground border-zinc-700 hover:bg-zinc-700  place-self-end",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        action:
          "justify-start gap-2 bg-background text-offblak hover:border-[1px] border-opacity-60",
      },
      size: {
        default: "rounded-[2px] h-10 px-4 py-2",
        sm: "h-9 rounded-[2px] px-3",
        lg: "h-11 rounded-[2px] px-8",
        icon: "h-10 w-10",
        wide: "h-12 min-w-fit w-[42%] md:w-1/3 px-2 rounded-[2px] basis-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
