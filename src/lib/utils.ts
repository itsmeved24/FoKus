import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Define specific interfaces for browser-specific fullscreen methods
interface FullscreenElement extends HTMLElement {
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface FullscreenDocument extends Document {
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

export function requestFullscreen(element: HTMLElement | null) {
  if (!element || typeof window === 'undefined') return;

  try {
    const fsElement = element as FullscreenElement;

    if (fsElement.requestFullscreen) {
      fsElement.requestFullscreen();
    } else if (fsElement.mozRequestFullScreen) {
      fsElement.mozRequestFullScreen();
    } else if (fsElement.webkitRequestFullscreen) {
      fsElement.webkitRequestFullscreen();
    } else if (fsElement.msRequestFullscreen) {
      fsElement.msRequestFullscreen();
    }
  } catch (error) {
    console.error("Error attempting to enable fullscreen:", error);
  }
}

export function exitFullscreen() {
  if (typeof document === 'undefined') return;

  try {
    const fsDocument = document as FullscreenDocument;

    if (fsDocument.exitFullscreen) {
      fsDocument.exitFullscreen();
    } else if (fsDocument.mozCancelFullScreen) {
      fsDocument.mozCancelFullScreen();
    } else if (fsDocument.webkitExitFullscreen) {
      fsDocument.webkitExitFullscreen();
    } else if (fsDocument.msExitFullscreen) {
      fsDocument.msExitFullscreen();
    }
  } catch (error) {
    console.error("Error attempting to exit fullscreen:", error);
  }
}
