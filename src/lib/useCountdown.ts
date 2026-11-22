import { useEffect, useState } from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isToday: boolean;
}

function compute(target: number): CountdownState {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, isToday: false };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: false,
    isToday: diff < 86400000,
  };
}

export function useCountdown(target: Date | number): CountdownState {
  const targetMs = target instanceof Date ? target.getTime() : target;
  const [state, setState] = useState<CountdownState>(() => compute(targetMs));

  useEffect(() => {
    setState(compute(targetMs));
    const timer = window.setInterval(() => setState(compute(targetMs)), 1000);
    return () => window.clearInterval(timer);
  }, [targetMs]);

  return state;
}
