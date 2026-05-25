'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function useLiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return {
      hours: 12, minutes: 0, seconds: 0, 
      date: '01', month: '01', ampm: 'am',
      hourDeg: 0, minuteDeg: 0, secondDeg: 0,
      formattedTime: '', formattedDate: '', raw: new Date()
    };
  }

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  return {
    hours:     h % 12 || 12,
    minutes:   m,
    seconds:   s,
    date:      String(time.getDate()).padStart(2, '0'),
    month:     String(time.getMonth() + 1).padStart(2, '0'),
    ampm:      h >= 12 ? 'pm' : 'am',
    hourDeg:   (h % 12) * 30 + m * 0.5,
    minuteDeg: m * 6,
    secondDeg: s * 6,
    formattedTime: format(time, 'h:mm aa').toLowerCase(),
    formattedDate: format(time, 'EEE, dd/MM'),
    raw: time,
  };
}
