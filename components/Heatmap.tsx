"use client";

import React from 'react';
import { useStore } from '@/store/useStore';

interface HeatmapProps {
  backgroundImage?: string;
  locationName?: string;
}

export const Heatmap: React.FC<HeatmapProps> = ({
  backgroundImage = '/hajj_crowd.png',
  locationName
}) => {
  const { language } = useStore();

  const labels = {
    ar: {
      live: locationName || "مباشر: المسجد الحرام",
      density: "كثافة الحشود",
      low: "منخفض",
      medium: "متوسط",
      critical: "حرج"
    },
    en: {
      live: locationName || "LIVE: GRAND MOSQUE",
      density: "Crowd Density",
      low: "Low",
      medium: "Medium",
      critical: "Critical"
    }
  };

  const l = labels[language];

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border group">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>

      {/* Mock Heatmap Overlay — Vision 2030 green/blue palette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-1/2 h-1/2 bg-primary/30 blur-[90px] rounded-full animate-pulse-slow"></div>
        <div className="w-1/3 h-1/3 bg-secondary/40 blur-[70px] rounded-full absolute top-1/4 left-1/4"></div>
        <div className="w-1/4 h-1/4 bg-info/50 blur-[50px] rounded-full absolute bottom-1/4 right-1/3"></div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 p-4 glass rounded-xl flex flex-col gap-2">
        <span className="text-[11px] font-semibold text-black">{l.density}</span>
        <div className="h-1.5 w-32 bg-gradient-to-r from-primary via-secondary to-danger rounded-full"></div>
        <div className="flex justify-between text-[10px] text-black font-bold">
          <span>{l.low}</span>
          <span>{l.medium}</span>
          <span>{l.critical}</span>
        </div>
      </div>

      {/* Status Badges */}
      <div className="absolute top-6 left-6 flex gap-2">
        <div className="px-3 py-1.5 glass rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">{l.live}</span>
        </div>
      </div>
    </div>
  );
};
