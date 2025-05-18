import { PomodoroTimer } from "@/components/pomodoro-timer";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-black w-full h-full">
        <StarsBackground 
          starDensity={0.0002} 
          allStarsTwinkle={true}
          twinkleProbability={0.7}
        />
        <ShootingStars
          starColor="#9E00FF"
          trailColor="#2EB9DF"
          minDelay={400}
          maxDelay={1000}
          minSpeed={2}
          maxSpeed={5}
          starWidth={6}
          starHeight={2}
        />
      </div>
      <div className="w-full max-w-screen-md mx-auto px-4">
        <PomodoroTimer />
      </div>
    </main>
  );
}
