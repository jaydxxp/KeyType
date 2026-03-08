"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { WORDS } from "@/lib/words";

export type TestState = "idle" | "typing" | "finished";

interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

export function useTypingTest(initialTime: number = 30) {
  const [words, setWords] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [state, setState] = useState<TestState>("idle");
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
  });
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  const [errorHistory, setErrorHistory] = useState<number[]>([]); 

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const historyRef = useRef<NodeJS.Timeout | null>(null);
  const currentErrorsRef = useRef<number>(0);

const generateWords = useCallback(() => {
  const generated = Array.from({ length: 500 }, () => {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  });

  setWords(generated);
}, []);

  useEffect(() => {
    generateWords();
  }, [generateWords]);


  useEffect(() => {
    if (state === "idle") {
      setTimeLeft(initialTime);
    }
  }, [initialTime, state]);

  const startTest = useCallback(() => {
    setState("typing");
    setWpmHistory([]);
    setErrorHistory([]);
    currentErrorsRef.current = 0;

    if (historyRef.current) clearInterval(historyRef.current);
    historyRef.current = setInterval(() => {
      setStats((prev) => {
        setWpmHistory((hist) => [...hist, prev.wpm]);
        setErrorHistory((hist) => [...hist, currentErrorsRef.current]);
     
        currentErrorsRef.current = 0;
        return prev;
      });
    }, 1000);
  }, []);

  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (historyRef.current) clearInterval(historyRef.current);
    setState("idle");
    setTimeLeft(initialTime);
    setUserInput("");
    setWpmHistory([]);
    setErrorHistory([]);
    currentErrorsRef.current = 0;
    setStats({
      wpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
    });
    generateWords();
  }, [initialTime, generateWords]);

  const finishTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (historyRef.current) clearInterval(historyRef.current);
    setState("finished");
  }, []);

  useEffect(() => {
    if (state === "typing" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state, timeLeft, finishTest]);

  const handleInput = useCallback(
    (value: string) => {
      if (state === "finished") return;
      if (state === "idle") startTest();

      setUserInput(value);


      const currentWords = words.join(" ");
      let correct = 0;
      let incorrect = 0;
      let tempErrors = 0;

      for (let i = 0; i < value.length; i++) {
        if (value[i] === currentWords[i]) {
          correct++;
        } else {
          incorrect++;
          tempErrors++;
        }
      }


      if (tempErrors > stats.incorrectChars) {
        currentErrorsRef.current += tempErrors - stats.incorrectChars;
      }

      const total = value.length;
      const accuracy = total > 0 ? (correct / total) * 100 : 100;


      const timePassedMinutes = (initialTime - timeLeft) / 60;
      const wpm = timePassedMinutes > 0 ? correct / 5 / timePassedMinutes : 0;

      setStats({
        wpm: Math.round(wpm),
        accuracy: Math.round(accuracy),
        correctChars: correct,
        incorrectChars: incorrect,
        totalChars: total,
      });
    },
    [state, startTest, words, initialTime, timeLeft, stats.incorrectChars],
  );

  return {
    words,
    userInput,
    timeLeft,
    state,
    stats,
    wpmHistory,
    errorHistory,
    handleInput,
    resetTest,
  };
}
