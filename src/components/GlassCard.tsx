import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className = "", hover = true }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        hover && "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
