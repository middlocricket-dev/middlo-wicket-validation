import { cn } from "@/lib/utils";
import middloLogo from "@/assets/middlo-logo.png";

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
  };

  return (
    <img 
      src={middloLogo} 
      alt="MIDDLO" 
      className={cn(sizeClasses[size], "w-auto object-contain", className)}
    />
  );
};
