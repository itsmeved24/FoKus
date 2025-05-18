"use client";

import { useState, useEffect } from "react";
import { useTimer } from "@/contexts/timer-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { settings, updateSettings } = useTimer();

  // Create local state to track changes before saving
  const [tempSettings, setTempSettings] = useState(settings);

  // Reset temp settings when dialog opens
  useEffect(() => {
    if (open) {
      setTempSettings(settings);
    }
  }, [open, settings]);

  // Save settings and close dialog
  const handleSave = () => {
    updateSettings(tempSettings);
    onOpenChange(false);
  };

  // Reset all settings to defaults
  const handleReset = () => {
    const defaultSettings = {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
      useSequence: false,
      soundEnabled: true,
      soundVolume: 50,
      soundType: "bell",
      showNotifications: false,
    };
    setTempSettings(defaultSettings);
    updateSettings(defaultSettings);
  };

  // Update a setting and apply it immediately
  const updateSetting = <K extends keyof typeof tempSettings>(
    key: K,
    value: typeof tempSettings[K]
  ) => {
    const newSettings = {
      ...tempSettings,
      [key]: value
    };
    setTempSettings(newSettings);
    updateSettings({ [key]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="settings-modal">
        <DialogHeader>
          <DialogTitle className="text-white">Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="timers" className="mt-4">
          <TabsList className="w-full grid grid-cols-2 mb-4 overflow-x-auto sm:overflow-visible">
            <TabsTrigger value="timers" className="text-xs sm:text-sm">Timers</TabsTrigger>
            <TabsTrigger value="sounds" className="text-xs sm:text-sm">Sounds</TabsTrigger>
          </TabsList>

          <TabsContent value="timers">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pomodoroLength">Pomodoro</Label>
                  <Input
                    id="pomodoroLength"
                    type="number"
                    min="1"
                    max="60"
                    value={tempSettings.pomodoro}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 25;
                      updateSetting("pomodoro", value);
                    }}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-400">minutes</span>
                </div>

                <div>
                  <Label htmlFor="shortBreakLength">Short Break</Label>
                  <Input
                    id="shortBreakLength"
                    type="number"
                    min="1"
                    max="30"
                    value={tempSettings.shortBreak}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 5;
                      updateSetting("shortBreak", value);
                    }}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-400">minutes</span>
                </div>

                <div>
                  <Label htmlFor="longBreakLength">Long Break</Label>
                  <Input
                    id="longBreakLength"
                    type="number"
                    min="1"
                    max="60"
                    value={tempSettings.longBreak}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 15;
                      updateSetting("longBreak", value);
                    }}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-400">minutes</span>
                </div>
              </div>

              <div className="flex items-start mt-4">
                <div className="flex items-start">
                <Switch
                  id="useSequence"
                  checked={tempSettings.useSequence as boolean}
                  onCheckedChange={(checked) => updateSetting("useSequence", checked)}
                  className="mr-2 mt-1"
                />
                  <div>
                    <Label htmlFor="useSequence" className="cursor-pointer text-sm md:text-base">
                    Pomodoro cycle: Focus → Short break (x4) → Long break
                    </Label>
                    <p className="text-xs text-gray-400">
                      Completed ones will be showcased via DOTS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sounds">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alertSound">Select alert sound:</Label>
                <Select
                  value={tempSettings.soundType}
                  onValueChange={(value) => updateSetting("soundType", value)}
                >
                  <SelectTrigger id="alertSound">
                    <SelectValue placeholder="Sound" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="chime">Chime</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="soundEnabled" className="text-sm md:text-base">
                  Play sound when timer finishes
                </Label>
                <Switch
                  id="soundEnabled"
                  checked={tempSettings.soundEnabled as boolean}
                  onCheckedChange={(checked) => updateSetting("soundEnabled", checked)}
                />                
              </div>

              <div className="space-y-2">
                <Label htmlFor="soundVolume">Alert volume</Label>
                <Slider
                  id="soundVolume"
                  min={0}
                  max={100}
                  step={1}
                  value={[tempSettings.soundVolume]}
                  onValueChange={([value]) => updateSetting("soundVolume", value)}
                />
              </div>

              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    if (tempSettings.soundEnabled) {
                      const audio = new Audio(`/sounds/${tempSettings.soundType}.mp3`);
                      audio.volume = tempSettings.soundVolume / 100;
                      audio.play().catch(error => {
                        console.error('Error playing test sound:', error);
                      });
                    }
                  }}
                >
                  Test Sound
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
          <Button variant="outline" className="text-red-500 w-full sm:w-auto order-3 sm:order-1" onClick={handleReset}>
            Reset All
          </Button>
          <div className="space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto flex flex-col sm:flex-row order-1 sm:order-3 sm:ml-auto">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleSave}>
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
