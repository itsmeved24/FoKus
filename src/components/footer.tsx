"use client";

import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative">
      {/* Starry background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-bg"></div>
      </div>

      {/* Footer content with glassmorphism effect */}
      <div className="relative fixed bottom-0 left-0 right-0 bg-background/30 backdrop-blur-sm border-t border-white/10 footer-container">
        <div className="container max-w-screen-md mx-auto">
          <div className="social-icons">
            <a
              href="https://github.com/itsmeved24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors social-icon"
            >
              <Github className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)]" />
            </a>
            <a
              href="https://www.linkedin.com/in/vedank-vansia-73167b270"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors social-icon"
            >
              <Linkedin className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 