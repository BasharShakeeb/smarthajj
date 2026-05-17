import React from 'react';
import { MapMock } from '@/components/MapMock';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function MobileMapPage() {
  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col">
      {/* Mobile Header */}
      <div className="p-4 flex items-center gap-4 bg-card border-b border-border">
        <Link href="/mobile">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="font-bold text-lg">Field Map View</h1>
      </div>

      {/* Full Screen Map */}
      <div className="flex-1">
        <MapMock />
      </div>

      {/* Mobile Controls */}
      <div className="p-4 bg-card border-t border-border grid grid-cols-3 gap-2">
        <button className="p-2 rounded-lg bg-accent/10 flex flex-col items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-[10px] font-bold">SOS</span>
        </button>
        <button className="p-2 rounded-lg bg-accent/10 flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold">TRACK</span>
        </button>
        <button className="p-2 rounded-lg bg-primary text-primary-foreground flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold">REPORT</span>
        </button>
      </div>
    </div>
  );
}
