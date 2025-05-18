"use client";

import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function FullscreenButton() {
  // We'll simplify this by using a basic approach
  const toggleFullscreen = () => {
    try {
      if (typeof document !== 'undefined' && document.documentElement) {
        if (!document.fullscreenElement) {
          // Request fullscreen
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          }
        } else {
          // Exit fullscreen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="fullscreen-btn"
            onClick={toggleFullscreen}
          >
            <span>Fullscreen your timer</span>
            <Maximize className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Fullscreen your timer</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
