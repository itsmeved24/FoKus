"use client";

import { useTimer } from "@/contexts/timer-context";
import { formatTime } from "@/lib/utils";

export function TimerDisplay() {
  const { time } = useTimer();

  return (
    <div className="timer-display">
      {formatTime(time)}
    </div>
  );
}
