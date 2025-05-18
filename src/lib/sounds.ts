export const SOUND_URLS = {
  bell: "/sounds/bell.mp3",
  chime: "/sounds/chime.mp3"
} as const;

// Preload sounds for better performance
export const preloadSounds = () => {
  Object.values(SOUND_URLS).forEach(url => {
    const audio = new Audio(url);
    audio.preload = "auto";
  });
}; 