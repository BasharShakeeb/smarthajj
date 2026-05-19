"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import {
  Users,
  Route as RouteIcon,
  Flame,
  AlertTriangle,
  ShieldCheck,
  Clock,
  CloudSun,
  Maximize2,
  Layers,
  Plus,
  Minus,
  Smartphone,
  CheckCircle,
  HelpCircle,
  Radio,
  MapPin,
  Heart,
  TrendingUp,
  BrainCircuit,
  Compass,
  User,
  ArrowRight,
  FlameKindling
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function OverviewPage() {
  const {
    language,
    theme,
    totalPilgrims,
    activeRoutesCount,
    currentCrowdCount,
    emergencyCount,
    safetyRate,
    responseTimeSeconds,
    selectedMobileScreen,
    setSelectedMobileScreen,
    activeBraceletColor,
    setActiveBraceletColor,
    routes,
    incidents,
    resolveIncident
  } = useStore();

  const t = translations[language];

  // Local clock state matching the exact screenshot (10:30:45)
  const [time, setTime] = useState('10:30:45');
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, [language]);

  // Donut chart mock data for Recharts
  const pieData = [
    { name: language === 'ar' ? 'منطقة 1' : 'Region 1', value: 826351, color: '#00A36C', percent: '28%' },
    { name: language === 'ar' ? 'منطقة 2' : 'Region 2', value: 738221, color: '#1E5AA8', percent: '25%' },
    { name: language === 'ar' ? 'منطقة 3' : 'Region 3', value: 590124, color: '#1B3A5C', percent: '20%' },
    { name: language === 'ar' ? 'منطقة 4' : 'Region 4', value: 501236, color: '#2980B9', percent: '17%' },
    { name: language === 'ar' ? 'منطقة 5' : 'Region 5', value: 293746, color: '#1E5AA8', percent: '10%' },
  ];

  // Map Zoom State
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="space-y-6 pb-12 animate-slide-up">

      {/* ─── Header Dashboard Bar ─── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass border border-slate-200 bg-white">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#006C35] to-[#1E5AA8] items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.25)] flex-shrink-0">
            <ShieldCheck className="text-slate-950" size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00A36C] animate-pulse" />
              <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase">SAUDI VISION 2030</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-glow-blue text-slate-900 mt-0.5">
              {t.appName}
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              {t.subTitle}
            </p>
          </div>
        </div>

        {/* Dynamic Cockpit Stats & clock */}
        <div className="flex items-center gap-4 self-end md:self-auto">
          <img src="/vision.png" alt="Vision 2030" className="h-10 object-contain" />
        </div>
      </header>

      {/* ─── Stats Grid (Top row metrics) ─── */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: Users, label: t.totalPilgrims, value: totalPilgrims.toLocaleString(), color: 'text-[#006C35]' },
          { icon: RouteIcon, label: t.activeRoutes, value: activeRoutesCount, color: 'text-[#006C35]' },
          { icon: Flame, label: t.currentCrowd, value: currentCrowdCount.toLocaleString(), color: 'text-[#2980B9]' },
          { icon: AlertTriangle, label: t.emergencyCases, value: emergencyCount, color: 'text-[#94A3B8]', isEmergency: emergencyCount > 0 },
          { icon: ShieldCheck, label: t.safetyRate, value: `${safetyRate}%`, color: 'text-[#006C35]' },
          { icon: Clock, label: t.responseTime, value: `${Math.floor(responseTimeSeconds / 60)}:${String(responseTimeSeconds % 60).padStart(2, '0')} ${language === 'ar' ? 'دقائق' : 'mins'}`, color: 'text-[#2980B9]' }
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl bg-white/95 shadow-lg border border-slate-200 backdrop-blur-md flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${stat.isEmergency ? 'border-[#94A3B8] shadow-[0_0_15px_rgba(148,163,184,0.15)] animate-pulse' : ''}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-600 tracking-wide uppercase truncate max-w-[80%]">{stat.label}</span>
              <stat.icon size={16} className={`${stat.color} ${stat.isEmergency ? 'animate-bounce' : ''}`} />
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-1">
              <h2 className={`text-xl font-black tracking-tight font-mono ${stat.isEmergency ? 'text-[#1E5AA8] text-glow-red' : 'text-slate-900'}`}>
                {stat.value}
              </h2>
              {stat.isEmergency ? (
                <span className="text-[9px] text-rose-500 font-extrabold animate-pulse">ACTIVE SOS</span>
              ) : (
                <span className="text-[8px] text-slate-500">LIVE</span>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Middle Section: Map + Distribution ─── */}
      <section className="flex flex-col gap-6">

        {/* Live Smart Map simulator (Full Width) */}
        <div className={`w-full flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden relative ${isFullscreen ? 'fixed inset-4 z-50 bg-white p-4' : 'h-[70vh] min-h-[550px]'}`}>

          {/* Top widget within Map */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[10px] text-slate-800">
              <CloudSun size={14} className="text-[#2980B9] animate-pulse" />
              <span className="font-extrabold">{t.weatherTitle}: 33°C ({t.weatherSunny})</span>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#1E5AA8] transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 size={16} />
            </button>
            <div className="flex flex-col rounded-xl bg-white border border-slate-200 overflow-hidden">
              <button onClick={() => setZoom(prev => Math.min(5, prev + 0.5))} className="p-2 text-slate-600 hover:text-[#00A36C] border-b border-slate-200 transition-colors">
                <Plus size={16} />
              </button>
              <button onClick={() => setZoom(prev => Math.max(1, prev - 0.5))} className="p-2 text-slate-600 hover:text-[#00A36C] transition-colors">
                <Minus size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Map Layout Screen replaced with Static Fully Rendered Dashboard Hero Image */}
          <div className="h-full w-full relative bg-[#0B1120] overflow-hidden flex items-center justify-center">
            {/* Map image overlay */}
            <motion.div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center select-none origin-center"
              style={{ backgroundImage: `url('/mina_hero_map.png')` }}
              animate={{ scale: zoom }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Bottom Columns: Distribution Donut + Pathway Corridor status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Crowd Distribution Pie Panel */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col h-[320px]">
            <h3 className="text-xs font-black tracking-wide text-slate-600 uppercase mb-2">
              {t.crowdDistribution}
            </h3>

            <div className="flex items-center justify-between flex-1 min-h-0">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#071226" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#020817', border: '1px solid #1e293b', borderRadius: '8px' }}
                      itemStyle={{ color: '#f8fafc', fontSize: '10px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-1/2 space-y-3 overflow-y-auto max-h-[220px] px-1">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[9px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-800 font-medium truncate">{item.name}</span>
                    </div>
                    <span className="text-slate-600 font-bold">{item.percent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Routes list status */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col h-[320px] overflow-y-auto">
            <h3 className="text-xs font-black tracking-wide text-slate-600 uppercase mb-4">
              {t.mainRoutesStatus}
            </h3>

            <div className="space-y-4">
              {routes.map((route) => {
                let badgeClass = 'text-[#00A36C] bg-[#006C35] border-[#006C35]';
                let glowBorder = 'rgba(0, 255, 136, 0.15)';
                let statusLabel = t.open;

                if (route.status === 'crowded') {
                  badgeClass = 'text-[#2980B9] bg-[#2980B9] border-[#2980B9]';
                  glowBorder = 'rgba(255, 193, 7, 0.15)';
                  statusLabel = t.crowded;
                } else if (route.status === 'closed') {
                  badgeClass = 'text-[#1E5AA8] bg-[#1E5AA8] border-[#1E5AA8]';
                  glowBorder = 'rgba(255, 59, 48, 0.15)';
                  statusLabel = t.closed;
                }

                return (
                  <div key={route.id} className="space-y-2 p-3 rounded-xl border border-slate-200 bg-white relative overflow-hidden group hover:border-slate-200 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-1.5 h-6 rounded-full bg-white" style={{ backgroundColor: route.status === 'open' ? '#00A36C' : route.status === 'crowded' ? '#2980B9' : '#1E5AA8' }} />
                        <span className="text-xs font-bold text-slate-900 truncate">{language === 'ar' ? route.nameAr : route.nameEn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-slate-600">{route.usagePercent}%</span>
                        <span className={`text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded border ${badgeClass}`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Progress slider bar */}
                    <div className="w-full h-1.5 rounded-full bg-white overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${route.usagePercent}%`,
                          background: route.status === 'open'
                            ? 'linear-gradient(90deg, #00C176, #00A36C)'
                            : route.status === 'crowded' ? '#2980B9' : '#1E5AA8'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom Row: Interactive Smart Bracelet Simulator + Pilgrim Mobile App Cockpit ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Smartphone UI Mockups (Left 7 Columns) */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase mb-4 flex items-center gap-2">
              <Smartphone size={16} className="text-[#1E5AA8]" />
              <span>{t.mobileAppSection.toUpperCase()}</span>
            </h3>

            {/* The Smartphone Device frame render mockup */}
            <div className="flex justify-center items-center py-6 min-h-[350px] relative">
              <div className="w-[280px] h-[520px] rounded-[40px] border-[10px] border-slate-200 bg-white shadow-2xl relative flex flex-col justify-between overflow-hidden ring-4 ring-cyan-500">
                {/* Phone Speaker & Camera Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-white z-30 flex items-center justify-center">
                  <div className="w-10 h-1 rounded-full bg-white mr-2" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>

                {/* Simulated Screen Content based on SelectedMobileScreen State */}
                <div className="flex-1 p-5 pt-8 flex flex-col justify-between overflow-y-auto">

                  {/* SCREEN 0: Home screen */}
                  {selectedMobileScreen === 0 && (
                    <div className="space-y-4 text-center mt-4">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1E5AA8] to-[#1E5AA8] flex items-center justify-center text-slate-900 text-base font-black ring-2 ring-[#00A36C]">
                          AH
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mt-2">{t.pilgrimNameVal}</h4>
                        <span className="text-[10px] text-slate-600 font-bold">{t.pilgrimGroupVal}</span>
                      </div>

                      {/* Health & Safety Indicators */}
                      <div className="p-4 rounded-2xl border border-[#006C35] bg-[#006C35] flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                        <div className="text-left">
                          <span className="text-[8px] font-black text-slate-600 tracking-wider uppercase block">{language === 'ar' ? 'حالة الأمان' : 'SAFETY STATE'}</span>
                          <span className="text-xs font-bold text-[#00A36C]">{t.pilgrimStatusSafe}</span>
                        </div>
                        <CheckCircle size={20} className="text-[#00A36C]" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 rounded-xl border border-slate-200 bg-white text-left">
                          <span className="text-[8px] font-black text-slate-600 uppercase block">{t.pilgrimBatteryVal}</span>
                          <span className="text-xs font-mono font-black text-slate-900 mt-1 block">100%</span>
                        </div>
                        <div className="p-3 rounded-xl border border-slate-200 bg-white text-left">
                          <span className="text-[8px] font-black text-slate-600 uppercase block">{language === 'ar' ? 'نبضات القلب' : 'HEART RATE'}</span>
                          <span className="text-xs font-mono font-black text-[#00A36C] mt-1 block flex items-center gap-1">
                            <Heart size={10} className="text-rose-500 animate-pulse" />
                            78 bpm
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl border border-slate-200 bg-white text-left flex items-center gap-2">
                        <MapPin size={16} className="text-[#1E5AA8]" />
                        <div>
                          <span className="text-[8px] font-black text-slate-600 uppercase block">{t.pilgrimCurrentLocVal}</span>
                          <span className="text-xs font-bold text-slate-900">{t.pilgrimLocVal}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 1: Live Routing Map */}
                  {selectedMobileScreen === 1 && (
                    <div className="space-y-3 mt-4">
                      <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase block text-center">{t.pilgrimMap}</span>

                      {/* Stylized minimap within phone */}
                      <div className="h-64 rounded-2xl border border-slate-200 bg-white overflow-hidden relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-cover opacity-60" style={{ backgroundImage: `url('/map_bg.png')` }} />
                        {/* Interactive tracking line inside mobile app */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 250">
                          <path d="M 40,220 Q 100,120 160,50" fill="none" stroke="#00A36C" strokeWidth="4" strokeLinecap="round" className="animate-flow-path" />
                          <circle cx="40" cy="220" r="6" fill="#00A36C" className="animate-pulse" />
                          <circle cx="160" cy="50" r="6" fill="#1E5AA8" />
                        </svg>
                        <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-white text-[8px] font-black text-[#00A36C] tracking-wider">
                          GPS SIGNAL: EXCELLENT
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-600 text-center font-bold">{language === 'ar' ? 'اتبع النقاط المضيئة الخضراء للوصول لمخيمك' : 'Follow the green glowing indicators to your camp'}</p>
                    </div>
                  )}

                  {/* SCREEN 2: SOS Emergency Alarm Screen */}
                  {selectedMobileScreen === 2 && (
                    <div className="space-y-4 text-center mt-4 flex flex-col items-center justify-center flex-1">
                      <div className="w-24 h-24 rounded-full bg-[#1E5AA8] border border-[#1E5AA8] flex items-center justify-center animate-sos-pulse">
                        <button
                          onClick={() => {
                            resolveIncident('INC-772');
                            setActiveBraceletColor('green');
                          }}
                          className="w-18 h-18 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-slate-900 font-black text-sm tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                        >
                          SOS
                        </button>
                      </div>
                      <h4 className="text-sm font-black text-[#1E5AA8] tracking-wide mt-3 uppercase text-glow-red">
                        {t.pilgrimSOS}
                      </h4>
                      <p className="text-[10px] text-slate-600 leading-normal font-bold">
                        {t.pilgrimSOSDesc}
                      </p>

                      <div className="w-full p-3 rounded-xl border border-[#1E5AA8] bg-[#1E5AA8] text-left mt-2">
                        <span className="text-[8px] font-black text-slate-600 block tracking-widest uppercase">{t.pilgrimCurrentLocVal}</span>
                        <span className="text-xs font-mono font-bold text-rose-300">21.4138° N, 39.8262° E</span>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 3: Smart Navigation Arrows */}
                  {selectedMobileScreen === 3 && (
                    <div className="space-y-6 text-center mt-4 flex flex-col items-center justify-center flex-1">
                      <div className="w-24 h-24 rounded-full bg-[#006C35] border border-[#006C35] flex items-center justify-center shadow-[0_0_25px_rgba(0,255,136,0.15)] animate-glow-pulse">
                        <Compass size={48} className="text-[#00A36C]" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-[#00A36C] tracking-wide">{t.pilgrimDirVal}</h4>
                        <p className="text-[10px] text-slate-600 font-bold mt-1">
                          {t.pilgrimDirDesc}
                        </p>
                      </div>

                      <div className="w-full p-3.5 rounded-2xl border border-slate-200 bg-white text-left text-xs font-bold text-slate-800">
                        {language === 'ar' ? '💡 مؤشر الازدحام بالمسار: آمن وسلس' : '💡 Path density: Stable and safe'}
                      </div>
                    </div>
                  )}

                  {/* SCREEN 4: Pilgrim Group details */}
                  {selectedMobileScreen === 4 && (
                    <div className="space-y-4 mt-4">
                      <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase block text-center">{t.pilgrimGroupTitle}</span>

                      <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-bold">{t.pilgrimGroupTitle}</span>
                          <span className="text-[#1E5AA8] font-black">مجموعة 15</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-bold">{t.pilgrimMembersVal}</span>
                          <span className="text-slate-900 font-mono font-black">125 / 150</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                        <span className="text-[8px] font-black text-slate-600 block tracking-widest uppercase">{t.pilgrimLeaderVal}</span>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-bold text-slate-900">{language === 'ar' ? 'محمد السبيعي' : 'Mohamed Al-Subaie'}</span>
                          <span className="text-[10px] text-[#00A36C] font-mono">+966 50 123 4567</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Navigation Bar Buttons Inside Phone Screen */}
                  <div className="border-t border-slate-200 pt-3 mt-6 flex justify-between gap-1 text-[9px] font-black text-slate-600">
                    <button onClick={() => setSelectedMobileScreen(0)} className={`flex-1 py-1 rounded-lg transition-colors ${selectedMobileScreen === 0 ? 'text-[#1E5AA8] bg-white' : 'hover:text-slate-900'}`}>{language === 'ar' ? 'الرئيسية' : 'Home'}</button>
                    <button onClick={() => setSelectedMobileScreen(1)} className={`flex-1 py-1 rounded-lg transition-colors ${selectedMobileScreen === 1 ? 'text-[#1E5AA8] bg-white' : 'hover:text-slate-900'}`}>{language === 'ar' ? 'الخريطة' : 'Map'}</button>
                    <button onClick={() => setSelectedMobileScreen(2)} className={`flex-1 py-1 rounded-lg transition-colors ${selectedMobileScreen === 2 ? 'text-[#1E5AA8] bg-white' : 'hover:text-slate-900'}`}>{language === 'ar' ? 'SOS' : 'SOS'}</button>
                    <button onClick={() => setSelectedMobileScreen(3)} className={`flex-1 py-1 rounded-lg transition-colors ${selectedMobileScreen === 3 ? 'text-[#1E5AA8] bg-white' : 'hover:text-slate-900'}`}>{language === 'ar' ? 'التوجيه' : 'Nav'}</button>
                    <button onClick={() => setSelectedMobileScreen(4)} className={`flex-1 py-1 rounded-lg transition-colors ${selectedMobileScreen === 4 ? 'text-[#1E5AA8] bg-white' : 'hover:text-slate-900'}`}>{language === 'ar' ? 'المجموعة' : 'Group'}</button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Smart Bracelets simulation & general stats (Right 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Smart Hajj Bracelets Capsule Render Panel */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase mb-5 flex items-center gap-2">
                <Radio size={16} className="text-[#1E5AA8]" />
                <span>{t.smartBraceletsTitle.toUpperCase()}</span>
              </h3>

              {/* Bracelet capsules rendering mock */}
              <div className="grid grid-cols-3 gap-3 py-4">
                {[
                  { color: 'green', label: t.openRouteLabel, border: 'border-[#006C35] bg-[#006C35] hover:border-emerald-400', glow: 'shadow-[0_0_15px_rgba(0,255,136,0.3)] bg-[#00A36C]' },
                  { color: 'yellow', label: t.warningCrowdedLabel, border: 'border-[#2980B9] bg-[#2980B9] hover:border-amber-400', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)] bg-amber-400' },
                  { color: 'red', label: t.stopDangerLabel, border: 'border-[#1E5AA8] bg-[#1E5AA8] hover:border-rose-400', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)] bg-[#1E5AA8] animate-pulse' }
                ].map((br, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveBraceletColor(br.color as any)}
                    className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all cursor-pointer ${br.border} ${activeBraceletColor === br.color ? 'ring-2 ring-cyan-500 scale-105' : 'hover:scale-[1.02]'}`}
                  >
                    {/* Visual Capsule Ring representation */}
                    <div className="w-16 h-8 rounded-full border-4 border-slate-200 flex items-center justify-center relative bg-white mb-3">
                      <div className={`w-8 h-2 rounded-full ${br.glow}`} />
                    </div>
                    <span className="text-[10px] font-black text-slate-900 leading-normal">{br.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[9px] text-slate-600 mt-2 text-center border-t border-slate-200 pt-4 leading-normal font-bold">
              {language === 'ar'
                ? '💡 انقر فوق أحد أجهزة السوار لمحاكاة إرسال النبضات وإرسال الألوان وتحديث شاشة الجوال بشكل حي!'
                : '💡 Click on any bracelet node to simulate real-time LED broadcasts and update mobile cockpit dynamically!'}
            </p>
          </div>

          {/* General Stats and support */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between flex-1">
            <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase mb-4">
              {t.generalStatsTitle}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-left">
                <span className="text-[8px] font-black text-slate-600 uppercase block">{t.totalTechnicalSupport}</span>
                <span className="text-base font-mono font-black text-slate-900 mt-1 block">1,247 {t.supportTicketUnit}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-left">
                <span className="text-[8px] font-black text-slate-600 uppercase block">{t.activeBracelets}</span>
                <span className="text-base font-mono font-black text-[#00A36C] mt-1 block">2,910,432</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-left">
                <span className="text-[8px] font-black text-slate-600 uppercase block">{t.resolvedCases}</span>
                <span className="text-base font-mono font-black text-[#1E5AA8] mt-1 block">2,156 {t.caseUnit}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-left">
                <span className="text-[8px] font-black text-slate-600 uppercase block">{t.successRate}</span>
                <span className="text-base font-mono font-black text-[#00A36C] mt-1 block">99.2%</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── AI Diagnostics & Smart Recommendations Footer ─── */}
      <section className="p-6 rounded-2xl border border-[#006C35] bg-[#006C35]/5 shadow-[0_0_20px_rgba(16,185,129,0.02)]">
        <h3 className="text-xs font-black tracking-widest text-[#00A36C] uppercase mb-4 flex items-center gap-2">
          <BrainCircuit size={16} className="text-[#00A36C] animate-pulse" />
          <span>{t.aiFeatureTitle.toUpperCase()}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-800">
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A36C] flex-shrink-0 animate-pulse" />
            <p className="leading-snug">{t.aiPredictiveCrowd}: <span className="text-[#00A36C]">{language === 'ar' ? 'الازدحام مستبعد خلال الـ 45 دقيقة القادمة' : 'Choke points low risk for next 45 min'}</span></p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 flex-shrink-0" />
            <p className="leading-snug">{t.aiRecommPath}: <span className="text-[#1E5AA8]">{language === 'ar' ? 'توجيه فوج 12 للمسار الجنوبي' : 'Route Group 12 to Southern Corridor'}</span></p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2980B9] flex-shrink-0 animate-pulse" />
            <p className="leading-snug">{t.aiSmartAlert}: <span className="text-[#2980B9]">{language === 'ar' ? 'التحليلات مستقرة بنسبة 99.8%' : 'Telemetry integrity solid at 99.8%'}</span></p>
          </div>
        </div>
      </section>


    </div>
  );
}

