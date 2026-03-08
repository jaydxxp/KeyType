"use client";

import { useState, useRef, useEffect } from "react";
import Grainient from "@/components/Gradient";
import { Keyboard, type KeyboardThemeName } from "@/components/ui/keyboard";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { THEME_CONFIG } from "@/lib/theme-config";
import { useTypingTest } from "@/hooks/useTypingTest";
import { cn } from "@/lib/utils";
import { IconRotateClockwise2, IconKeyboard } from "@tabler/icons-react";
import { PerformanceChart } from "@/components/charts/LineChart";

const TIMER_OPTIONS = [15, 30, 60, 120];

export default function Page() {
  const [currentTheme, setCurrentTheme] =
    useState<KeyboardThemeName>("classic");
  const [selectedTime, setSelectedTime] = useState(30);
  const themeColors = THEME_CONFIG[currentTheme];

  const {
    words,
    userInput,
    timeLeft,
    state,
    stats,
    handleInput,
    resetTest,
    wpmHistory,
    errorHistory,
  } = useTypingTest(selectedTime);

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    hiddenInputRef.current?.focus();
  };

  useEffect(() => {
    handleFocus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        resetTest();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetTest]);

  const handleTimeChange = (time: number) => {
    setSelectedTime(time);
    resetTest();
  };

  return (
    <div
      className="relative min-h-screen w-screen flex flex-col items-center font-jetbrains"
      onClick={handleFocus}
      style={
        {
          "--theme-primary": themeColors.color3,
          "--theme-primary-transparent": `${themeColors.color3}33`,
        } as React.CSSProperties
      }
    >
    
      <div className="fixed inset-0 z-0 bg-neutral-950">
        <Grainient
          color1={themeColors.color1}
          color2={themeColors.color2}
          color3={themeColors.color3}
          timeSpeed={0.12}
          zoom={0.7}
          contrast={1.1}
          grainAmount={0.05}
          className="opacity-90"
        />
      </div>


      <input
        ref={hiddenInputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none"
        value={userInput}
        onChange={(e) => handleInput(e.target.value)}
        autoFocus
      />

     
      <header className="w-full max-w-6xl px-4 md:px-8 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          <div className="p-1.5 md:p-2 rounded-xl bg-white/10 backdrop-blur-md">
            <IconKeyboard className="size-4 md:size-5 text-white" />
          </div>
          <h1 className="text-base md:text-lg font-bold tracking-tight text-white uppercase">
            KeyType
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <div className="flex bg-black/20 backdrop-blur-md p-1 rounded-xl">
            {TIMER_OPTIONS.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeChange(time)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-medium transition-all",
                  selectedTime === time
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/40 hover:text-white/60",
                )}
              >
                {time}s
              </button>
            ))}
          </div>

          <ThemeSwitcher
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
            className="p-1 rounded-xl bg-black/20 md:bg-transparent border-none backdrop-blur-md md:backdrop-blur-none scale-90 md:scale-100"
          />
        </div>
      </header>

     
      <main className="flex-1 w-full max-w-6xl flex flex-col items-center justify-start gap-4 md:gap-6 px-4 md:px-8 pt-4 md:pt-6 z-10">

        <section className="w-full flex justify-center">
          <div
            className="relative w-full max-w-4xl rounded-[2rem] md:rounded-3xl
            border border-white/20
            bg-white/10 backdrop-blur-xl
            shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            px-4 py-6 md:px-8 md:py-8"
          >
            <div
              className="relative w-full flex flex-wrap gap-y-3
              text-xl sm:text-2xl md:text-3xl
              tracking-normal
              select-none"
            >
              {state === "finished" ? (
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  <div className="w-full flex flex-col sm:flex-row items-center sm:items-end justify-between px-2 md:px-4 pb-4 border-b border-white/10 gap-6 sm:gap-0">
                    <div className="flex gap-8 md:gap-12">
                      <div className="flex flex-col items-center sm:items-start">
                        <span className="text-3xl md:text-4xl font-black text-white leading-none">
                          {stats.wpm}
                        </span>
                        <span
                          className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest mt-1"
                          style={{ color: themeColors.color3 }}
                        >
                          WPM
                        </span>
                      </div>
                      <div className="flex flex-col items-center sm:items-start">
                        <span className="text-3xl md:text-4xl font-black text-white leading-none">
                          {stats.accuracy}%
                        </span>
                        <span
                          className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest mt-1"
                          style={{ color: themeColors.color3 }}
                        >
                          Accuracy
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={resetTest}
                      className="group flex flex-col items-center gap-1 opacity-100 transition-all active:scale-95"
                    >
                      <div className="p-2.5 rounded-full bg-white/5 border border-white/10  ">
                        <IconRotateClockwise2 className="size-5 text-white group-hover:rotate-180 duration-500" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        Restart
                      </span>
                    </button>
                  </div>

            
                  <div className="w-full h-32 md:h-40 mt-2 px-1 md:px-2">
                    <PerformanceChart
                      data={wpmHistory.map((wpm, i) => ({
                        second: i + 1,
                        wpm,
                        errors: errorHistory[i] || 0,
                      }))}
                      themeColor={themeColors.color3}
                    />
                  </div>
                  <div className="w-full h-px bg-white/5 mx-4" />
                </div>
              ) : (
                <div className="typing-lines overflow-hidden relative">
                  <div
                    className="typing-inner flex flex-wrap gap-x-3 gap-y-0 transition-transform duration-300"
                    style={{
                      transform: `translateY(-${
                        typeof window !== "undefined" && window.innerWidth < 768
                          ? Math.floor(userInput.length / 40) * 32
                          : Math.floor(userInput.length / 60) * 42
                      }px)`,
                    }}
                  >
                    {(() => {
                      let cumulativeLength = 0;
                      return words.map((word, wordIndex) => {
                        const wordStartIndex = cumulativeLength;
                        cumulativeLength += word.length + 1; 

                        return (
                          <div key={wordIndex} className="flex">
                            {word.split("").map((char, charIndex) => {
                              const index = wordStartIndex + charIndex;
                              let status = "";

                              if (index < userInput.length) {
                                status =
                                  char === userInput[index]
                                    ? "correct"
                                    : "incorrect";
                              } else if (index === userInput.length) {
                                status = "current";
                              }

                              return (
                                <span
                                  key={charIndex}
                                  className={cn(
                                    "char",
                                    status === "correct" && "correct",
                                    status === "incorrect" && "incorrect",
                                    status === "current" && "current",
                                  )}
                                >
                                  {char}
                                </span>
                              );
                            })}

              
                            {wordIndex < words.length - 1 && (
                              <span
                                className={cn(
                                  "char space",
                                  userInput.length ===
                                    wordStartIndex + word.length && "current",
                                  userInput.length >
                                    wordStartIndex + word.length &&
                                    (userInput[wordStartIndex + word.length] ===
                                    " "
                                      ? "correct"
                                      : "incorrect"),
                                )}
                              >
                                &nbsp;
                              </span>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

 
        {state !== "finished" && (
          <div className="flex items-center gap-8 md:gap-12 text-white/40 mb-4 md:mb-0">
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-xl font-bold text-white/80">
                {stats.wpm}
              </span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-medium">
                WPM
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-lg md:text-xl font-bold text-white/80">
                {stats.accuracy}%
              </span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-medium">
                Accuracy
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-lg md:text-xl font-bold text-white/80">
                {timeLeft}s
              </span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-medium">
                Time
              </span>
            </div>
          </div>
        )}

 
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {state !== "finished" && (
            <div className="hidden md:block scale-[0.78] -mt-2 transition-all duration-300 hover:scale-[0.84]">
              <Keyboard theme={currentTheme} scale={1} />
            </div>
          )}

          {state !== "finished" && (
            <div className="flex flex-col items-center gap-2 md:-mt-0 mt-0 lg:-mt-10">
              <button
                onClick={resetTest}
                className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
              >
                <div className="p-3 md:p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all flex items-center justify-center">
                  <IconRotateClockwise2 className="size-5 md:size-4 text-white/70 group-hover:rotate-180 duration-500" />
                </div>
                <span className="text-[10px] md:text-[10px] font-bold uppercase tracking-widest text-white/70">
                  Restart
                </span>
              </button>
              <div className="hidden md:block px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] text-white/40 font-mono uppercase">
                Tab
              </div>
            </div>
          )}
        </div>
      </main>

    
    </div>
  );
}
