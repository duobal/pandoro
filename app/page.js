'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect, useRef } from "react";

// dear code pls work

function Timer() {
  const [remaining, setRemaining] = useState(25 * 60 * 1000);
  const [isRunning, setIsRunning] = useState(false);

  const deadlineRef = useRef(null);

  const start = () => {
    deadlineRef.current = Date.now() + remaining;
    setIsRunning(true);
  }

  const stop = () => setIsRunning(false);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      const left = deadlineRef.current - Date.now();
      if (left <= 0) {
        setRemaining(0);
        setIsRunning(false);
        return;
      }

      setRemaining(left);
    }, 250);

    return () => {
      clearInterval(id);
    }

  }, [isRunning])

  const totalSeconds = Math.floor(remaining / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const displayRemaining = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const toggleButtonDisplay = isRunning ? "Stop" : "Start";

  function reset() {
    setRemaining(25 * 60 * 1000);
    setIsRunning(false);
  }

  return (
    <div className={styles.timerWrap}>
      <h1 className={styles.timer}>{displayRemaining}</h1>
      <div className={styles.utilityButtonWrapper}>
        <button className={styles.utilityButton} onClick={() => {
          isRunning ? stop() : start()
        }}>{toggleButtonDisplay}</button>
        <button className={styles.utilityButton} onClick={reset}>Reset</button>
      </div>
    </div >
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <Timer />
    </div>
  );
}