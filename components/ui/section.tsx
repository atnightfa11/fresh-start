import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

export function Section({ 
  className, 
  size = "md",
  ...props 
}: SectionProps) {
  return (
    <section
      className={cn(
        "w-full",
        {
          "py-8": size === "sm",
          "py-12 md:py-16": size === "md",
          "py-16 md:py-24": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
} 