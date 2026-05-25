'use client';
import { useState, useEffect } from 'react';

export function useBattery() {
  const [battery, setBattery] = useState({ level: 1, charging: false });

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any).getBattery().then((bat: any) => {
        const update = () => setBattery({ level: bat.level, charging: bat.charging });
        update();
        bat.addEventListener('levelchange', update);
        bat.addEventListener('chargingchange', update);
        return () => {
          bat.removeEventListener('levelchange', update);
          bat.removeEventListener('chargingchange', update);
        };
      }).catch(() => {
        // Battery API not available or permission denied
      });
    }
  }, []);

  return battery;
}
