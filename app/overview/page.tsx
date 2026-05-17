"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Heatmap } from '@/components/Heatmap';
import { AlertsTable } from '@/components/AlertsTable';
import { Users, MapPin, Activity, AlertTriangle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export default function OverviewPage() {
  const { language, alertsCount } = useStore();
  const t = translations[language];

  // Dynamic ticking pilgrims counter
  const [pilgrimsCount, setPilgrimsCount] = useState(1284591);

  useEffect(() => {
    const interval = setInterval(() => {
      setPilgrimsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: t.totalPilgrims,
      value: pilgrimsCount.toLocaleString(),
      icon: Users,
      iconBg: 'bg-secondary/10', iconColor: 'text-secondary',
      subtext: language === 'ar' ? 'محدث تلقائياً' : 'Live checking...'
    },
    {
      label: t.activeZones, value: '24',
      icon: MapPin,
      iconBg: 'bg-primary/10',  iconColor: 'text-primary',
      subtext: language === 'ar' ? 'الشبكة التشغيلية نشطة' : 'All grids active'
    },
    {
      label: t.systemHealth, value: '99.9%',
      icon: Activity,
      iconBg: 'bg-info/10',     iconColor: 'text-info',
      subtext: language === 'ar' ? 'أداء النظام مستقر' : 'Stable server status'
    },
    {
      label: t.criticalAlerts, value: String(alertsCount),
      icon: AlertTriangle,
      iconBg: 'bg-danger/10',   iconColor: 'text-danger',
      subtext: language === 'ar' ? 'تنبيهات عاجلة تتطلب تدخلاً' : 'Requires review'
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.overview}</h1>
          <p className="text-muted-foreground mt-1">
            {language === 'ar'
              ? 'مراقبة فورية لعمليات وحركة حشود حج 1447هـ.'
              : 'Real-time monitoring of crowd movement for Hajj 1447H.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">{t.exportData}</Button>
          <Button>{t.genReport}</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <Card key={s.label} className="group hover:-translate-y-0.5 transition-all duration-300 hover:shadow-primary-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${s.iconBg} ${s.iconColor} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <s.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground truncate">{s.label}</p>
                <h2 className="text-2xl font-black mt-0.5 tracking-tight tabular-nums">{s.value}</h2>
                <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1.5">
                  <span className="inline-block w-1 h-1 rounded-full bg-primary animate-pulse" />
                  {s.subtext}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Heatmap */}
        <Card title={t.liveCrowd} className="lg:col-span-2">
          <Heatmap backgroundImage="/hajj.webp" />
        </Card>

        {/* Recent Alerts */}
        <Card title={t.recentAlerts}>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-xl hover:bg-primary/4 transition-colors border border-transparent hover:border-border"
              >
                <div className="w-1 h-10 rounded-full bg-danger flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{t.densityWarning}: {t.area} {i}</p>
                  <p className="text-xs text-muted-foreground">{t.capacityReached}</p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap self-start pt-0.5">
                  {t.mins} {t.ago}
                </span>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2">{t.viewAll}</Button>
          </div>
        </Card>
      </div>

      {/* Operational Log */}
      <Card title={t.opLog}>
        <AlertsTable />
      </Card>
    </div>
  );
}
