import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg" | "xl"; // Personnalisation de l'ombre
  bordered?: boolean; // Ajout d'une bordure
}

function Card({
  children,
  className,
  shadow = "md",
  bordered = false,
}: CardProps) {
  const shadowStyles = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-6 transition-all",
        shadowStyles[shadow],
        bordered && "border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}
interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

function CardHeader({ children, className }: CardSectionProps) {
  return (
    <div className={cn("text-lg font-bold text-gray-900 mb-3", className)}>
      {children}
    </div>
  );
}

function CardContent({ children, className }: CardSectionProps) {
  return <div className={cn("text-gray-700", className)}>{children}</div>;
}

function CardFooter({ children, className }: CardSectionProps) {
  return (
    <div className={cn("mt-4 flex justify-end", className)}>{children}</div>
  );
}
export { Card, CardHeader, CardContent, CardFooter };
