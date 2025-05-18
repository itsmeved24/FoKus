"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SOUND_URLS } from "@/lib/sounds";

type TimerType = "pomodoro" | "shortBreak" | "longBreak";

interface TimerContextType {
  time: number;
  isActive: boolean;
  timerType: TimerType;
  pomodoroCount: number;
  settings: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    useSequence: boolean;
    soundEnabled: boolean;
    soundVolume: number;
    soundType: string;
  };
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setTimerType: (type: TimerType) => void;
  updateSettings: (newSettings: Partial<TimerContextType["settings"]>) => void;
}

const defaultSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  useSequence: false,
  soundEnabled: true,
  soundVolume: 50,
  soundType: "bell",
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [time, setTime] = useState(25 * 60); // Default 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [timerType, setTimerType] = useState<TimerType>("pomodoro");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [settings, setSettings] = useState(defaultSettings);

  // Update timer when settings change
  useEffect(() => {
    updateTimerBasedOnType();
  }, [settings.pomodoro, settings.shortBreak, settings.longBreak]);

  // Initialize timer based on type change
  useEffect(() => {
    updateTimerBasedOnType();
  }, [timerType]);

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      // Timer completed
      setIsActive(false);
      playAlertSound();

      if (settings.useSequence) {
        handleTimerSequence();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  // Handle timer sequence
  const handleTimerSequence = () => {
    if (timerType === "pomodoro") {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);

      if (newCount % 4 === 0) {
        // After 4 pomodoros, take a long break
        setTimerType("longBreak");
      } else {
        // Otherwise take a short break
        setTimerType("shortBreak");
      }
    } else {
      // After a break, return to pomodoro
      setTimerType("pomodoro");
    }
  };

  // Play alert sound when timer finishes
  const playAlertSound = () => {
    if (settings.soundEnabled) {
      const soundUrl = SOUND_URLS[settings.soundType as keyof typeof SOUND_URLS];
      const audioElement = new Audio(soundUrl);
      audioElement.volume = settings.soundVolume / 100;
      audioElement.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }
  };

  // Helper function to update timer based on type
  const updateTimerBasedOnType = () => {
    if (isActive) {
      return; // Don't update while timer is running
    }

    switch (timerType) {
      case "pomodoro":
        setTime(settings.pomodoro * 60);
        break;
      case "shortBreak":
        setTime(settings.shortBreak * 60);
        break;
      case "longBreak":
        setTime(settings.longBreak * 60);
        break;
      default:
        setTime(settings.pomodoro * 60);
    }
  };

  // Start the timer
  const startTimer = () => {
    setIsActive(true);
  };

  // Pause the timer
  const pauseTimer = () => {
    setIsActive(false);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsActive(false);
    updateTimerBasedOnType();
  };

  // Update timer type
  const changeTimerType = (type: TimerType) => {
    if (isActive) {
      pauseTimer();
    }
    setTimerType(type);
  };

  // Update settings
  const updateSettings = (newSettings: Partial<TimerContextType["settings"]>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));

    // Note: We don't need to call resetTimer here anymore
    // as the useEffect will handle updating the timer
  };

  return (
    <TimerContext.Provider
      value={{
        time,
        isActive,
        timerType,
        pomodoroCount,
        settings,
        startTimer,
        pauseTimer,
        resetTimer,
        setTimerType: changeTimerType,
        updateSettings,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
