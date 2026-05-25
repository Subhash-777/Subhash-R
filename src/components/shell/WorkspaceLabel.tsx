'use client';
import { motion } from 'framer-motion';

export function WorkspaceLabel() {
  return (
    <div className="flex flex-col leading-none">
      <span className="text-xs text-gray-300 font-medium">Desktop</span>
      <span className="text-[10px] text-gray-500">Workspace 3</span>
    </div>
  );
}
