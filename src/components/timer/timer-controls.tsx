"use client";

import { useTimer } from "@/contexts/timer-context";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RefreshCw, Settings } from "lucide-react";

interface TimerControlsProps {
  onSettingsClick: () => void;
}

export function TimerControls({ onSettingsClick }: TimerControlsProps) {
  const { isActive, startTimer, pauseTimer, resetTimer } = useTimer();

  return (
    <div className="control-buttons">
      <Button
        className="w-24 md:w-28 rounded-full bg-white text-primary-foreground hover:bg-white/90 transition-all"
        onClick={isActive ? pauseTimer : startTimer}
      >
        {isActive ? "Pause" : "Start"}
      </Button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white"
              onClick={resetTimer}
            >
              <RefreshCw className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset Timer</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white"
              onClick={onSettingsClick}
            >
              <Settings className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Customize your theme, timer, and more!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
