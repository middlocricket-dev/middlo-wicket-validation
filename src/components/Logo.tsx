import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo = ({ className, variant = 'dark' }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg",
        variant === 'dark' 
          ? "bg-primary text-primary-foreground" 
          : "bg-primary-foreground text-primary"
      )}>
        M
      </div>
      <span className={cn(
        "font-extrabold text-2xl tracking-tight",
        variant === 'dark' ? "text-foreground" : "text-primary-foreground"
      )}>
        MIDDLO
      </span>
    </div>
  );
};
