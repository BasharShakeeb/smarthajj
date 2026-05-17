"use client";

import React from 'react';
import { MapPin, Search } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const MapMock = () => {
  const { language } = useStore();

  const labels = {
    ar: { bus: 'محطة الحافلات 1', clinic: 'عيادة أ', search: 'البحث عن المواقع، معرفات الحجاج...' },
    en: { bus: 'Bus Station 1',   clinic: 'Clinic A', search: 'Search locations, pilgrim IDs...'   },
  };

  const l = labels[language];

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-border bg-white">
      {/* High-Tech Map Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: "url('/map_bg.png')" }}
      ></div>

      {/* Overlay to ensure readability */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>



      {/* Markers */}
      <div className="absolute top-1/4 left-1/3 group cursor-pointer">
        <div className="animate-bounce text-primary drop-shadow-md">
          <MapPin size={32} fill="currentColor" fillOpacity={0.25} />
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 glass rounded-lg text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-medium text-foreground shadow-secondary-sm">
          {l.bus}
        </div>
      </div>

      <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
        <div className="animate-bounce text-secondary drop-shadow-md" style={{ animationDelay: '0.3s' }}>
          <MapPin size={32} fill="currentColor" fillOpacity={0.25} />
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 glass rounded-lg text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-medium text-foreground shadow-secondary-sm">
          {l.clinic}
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-5 left-5 right-5">
        <div className="glass rounded-xl flex items-center px-4 py-2.5 border border-border/60 shadow-secondary-sm">
          <Search size={16} className="text-secondary mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder={l.search}
            className="bg-transparent border-none outline-none w-full text-sm placeholder:text-muted-foreground text-foreground"
          />
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-5 right-5 flex flex-col gap-2">
        {['+', '−'].map((sym) => (
          <button
            key={sym}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center font-bold text-lg
              hover:bg-primary/10 hover:text-primary border border-border/60 transition-colors text-foreground shadow-card"
          >
            {sym}
          </button>
        ))}
      </div>
    </div>
  );
};
