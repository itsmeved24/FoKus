"use client";

import { useTimer } from "@/contexts/timer-context";
import { cn } from "@/lib/utils";

export function TimerTypeButtons() {
  const { timerType, setTimerType, pomodoroCount } = useTimer();

  return (
    <div className="timer-buttons flex items-baseline justify-center space-x-2 md:space-x-4">
      <button
        className={cn(
          "timer-button w-full md:w-auto",
          timerType === "pomodoro" && "active"
        )}
        onClick={() => setTimerType("pomodoro")}
      >
        Pomodoro
        <div className="pomo-counter">
          {pomodoroCount > 0 && Array(Math.min(pomodoroCount % 4 || 4, 4))
            .fill("•")
            .join(" ")}
        </div>
      </button>

      <button
        className={cn(
          "timer-button w-full md:w-auto",
          timerType === "shortBreak" && "active"
        )}
        onClick={() => setTimerType("shortBreak")}
      >
        Short Break
      </button>

      <button
        className={cn(
          "timer-button w-full md:w-auto",
          timerType === "longBreak" && "active"
        )}
        onClick={() => setTimerType("longBreak")}
      >
        Long Break
      </button>
    </div>
  );
}
