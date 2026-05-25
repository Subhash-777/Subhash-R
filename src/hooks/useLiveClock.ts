'use client';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function useLiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  return {
    hours:     h % 12 || 12,
    minutes:   m,
    seconds:   s,
    date:      time.getDate(),
    ampm:      h >= 12 ? 'pm' : 'am',
    hourDeg:   (h % 12) * 30 + m * 0.5,
    minuteDeg: m * 6,
    secondDeg: s * 6,
    formattedTime: format(time, 'h:mm aa').toLowerCase(),
    formattedDate: format(time, 'EEE, dd/MM'),
    raw: time,
  };
}
