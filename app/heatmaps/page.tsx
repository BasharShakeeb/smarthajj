"use client";

import React from 'react';
import { Card } from '@/components/Card';
import { Heatmap } from '@/components/Heatmap';
import { Button } from '@/components/Button';
import { Layers, Maximize2, RefreshCw } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export default function HeatmapsPage() {
  const { language } = useStore();
  const t = translations[language];

  const heatmapData = {
    ar: {
      title: "خرائط كثافة الحشود",
      desc: "تحليل الكثافة متعدد الطبقات عبر المشاعر المقدسة.",
      refresh: "تحديث",
      layers: "الطبقات",
      updated: "تحديث",
      now: "الآن",
      ago: "منذ",
      zones: [
        { title: "المسجد الحرام (المطاف)", time: "الآن", img: "/hajj.webp" },
        { title: "منى - رمي الجمرات", time: "5 دقائق", img: "/jamarat.webp" },
        { title: "منطقة عرفات الرئيسية", time: "دقيقتين", img: "/arafat.webp" },
        { title: "تجمع مزدلفة", time: "10 دقائق", img: "/muzdalifah.jpg" }
      ]
    },
    en: {
      title: "Crowd Heatmaps",
      desc: "Multi-layered density analysis across holy sites.",
      refresh: "Refresh",
      layers: "Layers",
      updated: "Updated",
      now: "Just now",
      ago: "ago",
      zones: [
        { title: "Grand Mosque (Mataf)", time: "Just now", img: "/hajj.webp" },
        { title: "Mina - Jamarat", time: "5m ago", img: "/jamarat.webp" },
        { title: "Arafat Main Area", time: "2m ago", img: "/arafat.webp" },
        { title: "Muzdalifah Gathering", time: "10m ago", img: "/muzdalifah.jpg" }
      ]
    }
  };

  const d = heatmapData[language];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{d.title}</h1>
          <p className="text-muted-foreground mt-1">{d.desc}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><RefreshCw size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} /> {d.refresh}</Button>
          <Button variant="outline" size="sm"><Layers size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} /> {d.layers}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {d.zones.map((zone, i) => (
          <Card key={i} title={zone.title}>
            <Heatmap backgroundImage={zone.img} locationName={zone.title} />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {d.updated}: {zone.time}
              </span>
              <Button variant="ghost" size="sm"><Maximize2 size={16} /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
