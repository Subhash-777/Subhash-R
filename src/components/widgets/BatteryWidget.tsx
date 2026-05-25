'use client';
import { Battery, BatteryCharging } from 'lucide-react';
import { useBattery } from '@/hooks/useBattery';

export function BatteryWidget() {
  const { level, charging } = useBattery();
  const pct = Math.round(level * 100);
  const color = pct > 20 ? 'text-green-400' : 'text-red-400';

  return (
    <div className="glass-card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {charging ? <BatteryCharging className="text-yellow-400" /> : <Battery className={color} />}
        <div>
          <div className="text-xs font-semibold text-white">Battery Status</div>
          <div className="text-[10px] text-gray-400">{charging ? 'Charging' : 'Discharging'}</div>
        </div>
      </div>
      <div className={`text-xl font-bold font-mono ${color}`}>{pct}%</div>
    </div>
  );
}
