import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[24px] text-sm font-medium transition-[transform,background-color,color,border-color] duration-[160ms] ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: "bg-sunshine-highlight text-primary-foreground hover:bg-sunshine-highlight/85",
        destructive:
          "bg-ink text-background hover:bg-ink/85",
        outline:
          "border border-ink bg-transparent text-ink hover:bg-ink hover:text-background",
        secondary:
          "border border-ink bg-transparent text-ink hover:bg-ink hover:text-background",
        ghost:
          "bg-transparent hover:bg-ink/5",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 px-6 py-3.5 has-[>svg]:px-5",
        sm: "min-h-9 gap-1.5 px-4 py-2 has-[>svg]:px-3",
        lg: "min-h-12 px-6 py-4 has-[>svg]:px-5",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
