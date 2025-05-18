"use client";

import { useState } from "react";
import { TimerProvider } from "@/contexts/timer-context";
import { Logo } from "@/components/logo";
import { TimerDisplay } from "@/components/timer/timer-display";
import { TimerTypeButtons } from "@/components/timer/timer-type-buttons";
import { TimerControls } from "@/components/timer/timer-controls";
import { SettingsDialog } from "@/components/timer/settings-dialog";
import { Footer } from "@/components/footer";

export function PomodoroTimer() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <TimerProvider>
      <div className="min-h-screen flex flex-col">
        <div className="container max-w-screen-md mx-auto px-4 py-6 flex flex-col items-center justify-center flex-grow">
          <Logo />

          <div className="w-full mt-4 md:mt-8">
            <TimerTypeButtons />
          </div>

          <div className="my-4 md:my-8">
            <TimerDisplay />
          </div>

          <div className="mb-4 md:mb-8">
            <TimerControls onSettingsClick={() => setSettingsOpen(true)} />
          </div>

          <SettingsDialog
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
          />
        </div>
        <Footer />
      </div>
    </TimerProvider>
  );
}
