import { useState, useEffect } from 'react';

export interface CountdownState {
  status: 'upcoming' | 'today' | 'past';
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetDate: Date;
  daysPassed?: number;
  formattedDate: string;
}

export function useCountdown(birthDateString: string, timezone: string = 'Asia/Ho_Chi_Minh'): CountdownState {
  const [state, setState] = useState<CountdownState>(() => calculateCountdown(birthDateString));

  useEffect(() => {
    setState(calculateCountdown(birthDateString));
    const timer = setInterval(() => {
      setState(calculateCountdown(birthDateString));
    }, 1000);

    return () => clearInterval(timer);
  }, [birthDateString, timezone]);

  return state;
}

function calculateCountdown(birthDateString: string): CountdownState {
  // Parse YYYY-MM-DD or MM-DD
  const parts = birthDateString.split('-').map(Number);
  let birthMonth = 0;
  let birthDay = 1;

  if (parts.length === 3) {
    // [YYYY, MM, DD]
    birthMonth = parts[1] - 1; // 0-indexed
    birthDay = parts[2];
  } else if (parts.length === 2) {
    // [MM, DD]
    birthMonth = parts[0] - 1;
    birthDay = parts[1];
  }

  const now = new Date();
  const currentYear = now.getFullYear();

  // Create birthday date for this year
  const birthdayThisYear = new Date(currentYear, birthMonth, birthDay, 0, 0, 0, 0);
  const birthdayEndOfDay = new Date(currentYear, birthMonth, birthDay, 23, 59, 59, 999);

  // Check if today is the birthday
  const isToday =
    now.getFullYear() === currentYear &&
    now.getMonth() === birthMonth &&
    now.getDate() === birthDay;

  // Format date display
  const formattedDate = `${String(birthDay).padStart(2, '0')}/${String(birthMonth + 1).padStart(2, '0')}/${currentYear}`;

  if (isToday) {
    return {
      status: 'today',
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      targetDate: birthdayThisYear,
      formattedDate,
    };
  }

  // If now is before this year's birthday
  if (now.getTime() < birthdayThisYear.getTime()) {
    const diffMs = birthdayThisYear.getTime() - now.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    return {
      status: 'upcoming',
      days,
      hours,
      minutes,
      seconds,
      targetDate: birthdayThisYear,
      formattedDate,
    };
  }

  // If now is after this year's birthday (birthday has passed this year)
  // Per requirement 4: Do not show negative countdown. Show celebration and time elapsed since birthday.
  const elapsedMs = now.getTime() - birthdayEndOfDay.getTime();
  const daysPassed = Math.floor(elapsedMs / (1000 * 60 * 60 * 24)) + 1;
  const hours = Math.floor((elapsedMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);
  const seconds = Math.floor((elapsedMs / 1000) % 60);

  return {
    status: 'past',
    days: 0,
    hours,
    minutes,
    seconds,
    daysPassed,
    targetDate: birthdayThisYear,
    formattedDate,
  };
}

