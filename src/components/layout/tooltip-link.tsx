"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipLinkProps {
  href: string;
  label: string;
  tooltipText: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function TooltipLink({
  href,
  label,
  tooltipText,
  external = false,
  className,
  children,
}: TooltipLinkProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className={className}
            aria-label={label}
          >
            {children}
          </a>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
