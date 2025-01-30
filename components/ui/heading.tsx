import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  gradient?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export function Heading({ 
  className, 
  gradient, 
  as: Component = 'h1',
  children,
  ...props 
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "font-bold tracking-tight",
        {
          'text-4xl md:text-6xl': Component === 'h1',
          'text-3xl md:text-4xl': Component === 'h2',
          'text-2xl md:text-3xl': Component === 'h3',
          'text-xl md:text-2xl': Component === 'h4',
        },
        gradient && "bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
} 