"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import {
  Users,
  MapPin,
  Activity,
  AlertTriangle,
  Flame,
  Clock,
  CloudSun,
  Maximize2,
  Layers,
  Plus,
  Minus,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  Compass,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Route as RouteIcon,
  Unlock,
  Lock,
  CornerDownRight,
  BellRing
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, ReferenceDot } from 'recharts';

export default function CrowdManagementPage() {
  const { language, theme, tickSimulation, addToast } = useStore();
  const t = translations[language];

  // Local state for the selected region (1 to 5) to display in the Details Panel
  const [selectedRegionId, setSelectedRegionId] = useState<number>(5);

  // Simulation parameters for 5 regions
  const [regions, setRegions] = useState([
    { id: 1, nameAr: 'منطقة 1 (جسر الجمرات)', nameEn: 'Zone 1 (Jamarat Bridge)', pilgrims: 351432, density: 78, statusAr: 'طبيعي', statusEn: 'Normal', color: '#2980B9', statusKey: 'warning', closedRoutes: 1 },
    { id: 2, nameAr: 'منطقة 2 (الخيام السكنية)', nameEn: 'Zone 2 (Camps Grid)', pilgrims: 821356, density: 82, statusAr: 'مزدحم', statusEn: 'Crowded', color: '#2980B9', statusKey: 'warning', closedRoutes: 0 },
    { id: 3, nameAr: 'منطقة 3 (محطة القطار)', nameEn: 'Zone 3 (Train Station)', pilgrims: 590124, density: 88, statusAr: 'مزدحم جداً', statusEn: 'Highly Crowded', color: '#2980B9', statusKey: 'warning', closedRoutes: 1 },
    { id: 4, nameAr: 'منطقة 4 (طريق الشعيبين)', nameEn: 'Zone 4 (Al-Shuaibeen Rd)', pilgrims: 293746, density: 65, statusAr: 'طبيعي', statusEn: 'Normal', color: '#00A36C', statusKey: 'safe', closedRoutes: 0 },
    { id: 5, nameAr: 'منطقة 5 (وادي منى الضيق)', nameEn: 'Zone 5 (Narrow Valley)', pilgrims: 559214, density: 95, statusAr: 'مزدحم جداً', statusEn: 'Highly Crowded', color: '#1E5AA8', statusKey: 'danger', closedRoutes: 3 }
  ]);

  // Main Route corridors simulation list for the selected region
  const [routeCorridors, setRouteCorridors] = useState([
    { id: 'north', nameAr: 'الشمالي', nameEn: 'North', status: 'open', density: 78, flow: '>>>' },
    { id: 'south', nameAr: 'الجنوبي', nameEn: 'South', status: 'closed', density: 95, flow: '>>>' },
    { id: 'east', nameAr: 'الشرقي', nameEn: 'East', status: 'open', density: 82, flow: '>>>' },
    { id: 'west', nameAr: 'الغربي', nameEn: 'West', status: 'closed', density: 93, flow: '<<<' },
    { id: 'central', nameAr: 'الأوسط', nameEn: 'Central', status: 'closed', density: 95, flow: '<<<' }
  ]);

  // Map settings
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Time state matching 10:30:45 format
  const [time, setTime] = useState('10:30:45');
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, [language]);

  // Handle globally opening/closing all routes
  const handleOpenAllRoutes = () => {
    setRouteCorridors(prev => prev.map(r => ({ ...r, status: 'open', density: Math.max(30, r.density - 15) })));
    addToast(
      language === 'ar'
        ? '🔓 تم تطبيق أمر فتح جميع المسارات التشغيلية!'
        : '🔓 Broadcast Command: All operational corridors OPENED!',
      'success'
    );
  };

  const handleCloseAllRoutes = () => {
    setRouteCorridors(prev => prev.map(r => ({ ...r, status: 'closed', density: 0 })));
    addToast(
      language === 'ar'
        ? '🔒 تم تطبيق أمر إغلاق جميع المسارات التشغيلية للوقاية!'
        : '🔒 Broadcast Command: All operational corridors CLOSED for safety!',
      'warning'
    );
  };

  // Toggle individual route status
  const toggleRoute = (id: string) => {
    setRouteCorridors(prev => prev.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === 'open' ? 'closed' : r.status === 'closed' ? 'crowded' : 'open';
        return {
          ...r,
          status: nextStatus,
          density: nextStatus === 'open' ? 65 : nextStatus === 'crowded' ? 88 : 0
        };
      }
      return r;
    }));
    addToast(
      language === 'ar'
        ? `⚙️ تم تغيير حالة المسار ${id.toUpperCase()}`
        : `⚙️ Operational corridor status modified: ${id.toUpperCase()}`,
      'success'
    );
  };

  // Direct actions for specific corridors in active control panel
  const handleDirectAction = (id: string, action: 'open' | 'closed') => {
    setRouteCorridors(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, status: action, density: action === 'open' ? 68 : 0 };
      }
      return r;
    }));
    addToast(
      language === 'ar'
        ? `⚡ تم تطبيق أمر مباشر: ${action === 'open' ? 'فتح' : 'إغلاق'} المسار ${id.toUpperCase()}`
        : `⚡ Direct override: ${action.toUpperCase()} Route ${id.toUpperCase()}`,
      'success'
    );
  };

  // Apply changes simulation button
  const handleApplyZoneSettings = () => {
    // Generate simulated toast
    addToast(
      language === 'ar'
        ? `✅ تم تطبيق وإرسال موجات التوجيه الذكية للأساور في المنطقة ${selectedRegionId}!`
        : `✅ Dynamic pathway controls broadcasted to wearables in Region ${selectedRegionId}!`,
      'success'
    );
  };

  // Line chart data representing density over time (Recharts)
  const timelineData = [
    { name: '00:00', density: 38 },
    { name: '02:00', density: 42 },
    { name: '04:00', density: 50 },
    { name: '06:00', density: 62 },
    { name: '08:00', density: 70 },
    { name: '10:00', density: 78 },
    { name: '10:30', density: 78 }, // Highlight coordinate
    { name: '12:00', density: 75 },
    { name: '14:00', density: 68 },
    { name: '16:00', density: 72 },
    { name: '18:00', density: 76 },
    { name: '20:00', density: 78 },
    { name: '22:00', density: 74 },
    { name: '24:00', density: 65 },
  ];

  // AI Diagnostic notifications list
  const aiAlerts = [
    { id: 1, textAr: 'منطقة 5: كثافة مرتفعة جداً - يوجد خطر تدافع وثيق', textEn: 'Zone 5: High Crowd Density - Immediate stomp risk detected', type: 'danger', time: '10:30' },
    { id: 2, textAr: 'منطقة 2: كثافة مرتفعة - يوصى بفتح مسارات إضافية فوراً', textEn: 'Zone 2: Moderate Crowd - Recommend opening additional corridors', type: 'warning', time: '10:28' },
    { id: 3, textAr: 'منطقة 4: حالة طبيعية ومعدلات التدفق سلسة', textEn: 'Zone 4: Flows are within safe, optimal parameters', type: 'safe', time: '10:25' }
  ];

  const currentRegion = regions.find(r => r.id === selectedRegionId) || regions[4];

  return (
    <div className={`space-y-6 pb-12 animate-slide-up ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : ''}`}>

      {/* ─── Header Panel ─── */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass border border-slate-200 bg-white">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-tr from-[#006C35] to-[#1E5AA8] items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.25)] flex-shrink-0">
            <ShieldCheck className="text-slate-950" size={26} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-black tracking-widest text-slate-600">SAUDI VISION 2030</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 text-glow-blue mt-0.5">
              {language === 'ar' ? 'إدارة الحشود والمنافذ' : 'Live Crowd Management & Corridors'}
            </h1>
            <p className="text-[10px] text-slate-600 font-bold uppercase">
              {language === 'ar' ? 'منظومة المسار المضيء الرقمية' : 'Luminous Path Digital Cockpit Grid'}
            </p>
          </div>
        </div>

        {/* Live Clock HUD */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[#1E5AA8] font-mono text-base font-black tracking-widest block">{time}</span>
            <span className="text-[9px] text-slate-600 font-bold uppercase mt-0.5">1447/11/13 هـ • GRID SYNCED</span>
          </div>
          <button
            onClick={tickSimulation}
            className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#00A36C] hover:border-[#006C35] active:scale-95 transition-all cursor-pointer"
            title="Tick Live Sensors"
          >
            <Activity size={16} className="animate-pulse" />
          </button>
        </div>
      </header>

      {/* ─── Metric Cards Grid ─── */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { icon: Users, labelAr: 'إجمالي الحجاج', labelEn: 'Total Pilgrims', value: '2,951,432', color: 'text-[#006C35]' },
          { icon: Flame, labelAr: 'الحشود الحالية', labelEn: 'Current Crowd', value: '2,345,678', color: 'text-[#2980B9]' },
          { icon: MapPin, labelAr: 'المناطق النشطة', labelEn: 'Active Zones', value: '5', color: 'text-[#006C35]' },
          { icon: TrendingUp, labelAr: 'الكثافة العامة', labelEn: 'Overall Density', value: '78%', color: 'text-[#1E5AA8]' },
          { icon: AlertTriangle, labelAr: 'الحالات الطارئة', labelEn: 'Emergency Cases', value: '23', color: 'text-[#94A3B8]' }
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/95 shadow-lg border border-slate-200 backdrop-blur-md flex flex-col justify-between h-[110px] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-wide">
                {language === 'ar' ? card.labelAr : card.labelEn}
              </span>
              <card.icon size={18} className={card.color} />
            </div>
            <h2 className="text-xl font-black font-mono text-slate-900 tracking-tight mt-3">
              {card.value}
            </h2>
          </div>
        ))}
      </section>

      {/* ─── Middle Section: Map HUD + Sidebars ─── */}
      <section className="flex flex-col gap-6">

        {/* Map Grid Simulator (Full Width) */}
        <div className={`w-full flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden relative ${isFullscreen ? 'fixed inset-4 z-50 bg-white p-4' : 'h-[70vh] min-h-[550px]'}`}>

          {/* Internal Map Widgets */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[10px] text-slate-800 backdrop-blur-md shadow-2xl">
              <CloudSun size={14} className="text-[#2980B9]" />
              <span className="font-extrabold">{language === 'ar' ? 'الطقس في منى: 33°C مشمس' : 'Mina Weather: 33°C Sunny'}</span>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 rounded-xl bg-white/85 border border-slate-200 text-slate-600 hover:text-[#1E5AA8] transition-colors backdrop-blur-md"
              title="Fullscreen Mode"
            >
              <Maximize2 size={16} />
            </button>
            <div className="flex flex-col rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <button onClick={() => setZoom(prev => Math.min(5, prev + 0.5))} className="p-2.5 text-slate-600 hover:text-[#00A36C] border-b border-slate-200 transition-colors">
                <Plus size={16} />
              </button>
              <button onClick={() => setZoom(prev => Math.max(1, prev - 0.5))} className="p-2.5 text-slate-600 hover:text-[#00A36C] transition-colors">
                <Minus size={16} />
              </button>
            </div>
          </div>

          {/* Map Viewer Render replaced with Static Fully Rendered Dashboard Hero Image */}
          <div className="h-full w-full relative bg-[#0B1120] overflow-hidden flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-contain bg-no-repeat bg-center select-none origin-center"
              style={{ backgroundImage: `url('/mina_hero_map.png')` }}
              animate={{ scale: zoom }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Bottom sidebars: Density distribution & Selected region details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Density list */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col h-[320px]">
            <h3 className="text-xs font-black tracking-wide text-slate-600 uppercase mb-3.5">
              {language === 'ar' ? 'توزيع الكثافة في المناطق' : 'Regional Crowd Occupancy'}
            </h3>

            <div className="space-y-2.5 overflow-y-auto max-h-[240px] px-1">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegionId(region.id)}
                  className={`w-full text-left flex flex-col gap-1 cursor-pointer p-1 rounded-lg hover:bg-white transition-all ${selectedRegionId === region.id ? 'ring-1 ring-cyan-500 bg-[#1E5AA8]/5' : ''}`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-800 truncate">{language === 'ar' ? region.nameAr : region.nameEn}</span>
                    <span className="font-mono font-black" style={{ color: region.color }}>{region.density}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${region.density}%`,
                        backgroundColor: region.color
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Region details */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col flex-1 h-[320px] justify-between relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-black tracking-wide text-slate-600 uppercase">
                  {language === 'ar' ? 'تفاصيل المنطقة المحددة' : 'Selected Grid Metrics'}
                </h3>
                <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${currentRegion.statusKey === 'danger' ? 'text-[#1E5AA8] border-[#1E5AA8] bg-[#1E5AA8] animate-pulse' : 'text-[#2980B9] border-[#2980B9] bg-[#2980B9]'}`}>
                  {language === 'ar' ? currentRegion.statusAr : currentRegion.statusEn}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <MapPin size={16} className="text-[#1E5AA8]" />
                  <span>{language === 'ar' ? currentRegion.nameAr : currentRegion.nameEn}</span>
                </h4>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] font-semibold text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'عدد الحجاج:' : 'Pilgrims:'}</span>
                    <span className="text-slate-900 font-mono font-black">{currentRegion.pilgrims.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'نسبة الكثافة:' : 'Density:'}</span>
                    <span className="text-slate-900 font-mono font-black" style={{ color: currentRegion.color }}>{currentRegion.density}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'آخر تحديث:' : 'Updated:'}</span>
                    <span className="text-slate-800 font-mono font-bold">{time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'المسارات المغلقة:' : 'Closed:'}</span>
                    <span className="text-[#1E5AA8] font-bold">{currentRegion.closedRoutes}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleApplyZoneSettings}
              className="w-full py-1.5 rounded-lg bg-[#1E5AA8] hover:bg-[#1E5AA8] border border-[#1E5AA8] text-[#1E5AA8] font-black text-[9px] tracking-widest uppercase hover:scale-[1.01] transition-all cursor-pointer mt-4"
            >
              {language === 'ar' ? 'تحديث وتفويج المنطقة المحددة' : 'DEPLOY REGION OVERRIDES'}
            </button>
          </div>

        </div>

      </section>

      {/* ─── Control Panels & Pathway Corridor Table ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Control commands (7 Columns) */}
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Main Corridor Commands buttons */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between h-[230px]">
            <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase flex items-center gap-1.5">
              <Layers size={16} className="text-[#1E5AA8]" />
              <span>{language === 'ar' ? 'أوامر التحكم في المسارات' : 'CORRIDOR ACTION DESK'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <button
                onClick={handleOpenAllRoutes}
                className="py-2.5 rounded-xl border border-[#006C35] bg-[#006C35] hover:border-emerald-400 text-[#00A36C] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.05)] hover:scale-[1.02]"
              >
                {language === 'ar' ? '🔓 فتح جميع المسارات' : '🔓 OPEN ALL ROUTES'}
              </button>
              <button
                onClick={() => addToast(language === 'ar' ? '⚡ تم تحديد مسارات ذكية للتعديل' : '⚡ Smart route adjustments loaded', 'success')}
                className="py-2.5 rounded-xl border border-[#2980B9] bg-[#2980B9] hover:border-amber-400 text-[#2980B9] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer hover:scale-[1.02]"
              >
                {language === 'ar' ? '⚡ فتح مسارات محددة' : '⚡ OPEN SELECTED'}
              </button>
              <button
                onClick={handleCloseAllRoutes}
                className="py-2.5 rounded-xl border border-[#1E5AA8] bg-[#1E5AA8] hover:border-rose-400 text-[#1E5AA8] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.05)] hover:scale-[1.02]"
              >
                {language === 'ar' ? '🔒 إغلاق جميع المسارات' : '🔒 CLOSE ALL ROUTES'}
              </button>
              <button
                onClick={() => addToast(language === 'ar' ? '🔒 تم إغلاق مسارات تفاديًا للازدحام' : '🔒 Corridor limits applied', 'warning')}
                className="py-2.5 rounded-xl border border-[#1B3A5C] bg-white hover:border-violet-400 text-[#2980B9] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer hover:scale-[1.02]"
              >
                {language === 'ar' ? '🔒 إغلاق مسارات محددة' : '🔒 CLOSE SELECTED'}
              </button>
            </div>
          </div>

          {/* Specific Active Grid overrides for region 5 */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between h-[230px]">
            <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase">
              {language === 'ar' ? `التحكم المباشر بالمنطقة (منطقة ${selectedRegionId})` : `DIRECT GRID CONTROL (REGION ${selectedRegionId})`}
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <button
                onClick={() => handleDirectAction('north', 'open')}
                className="py-2 rounded-xl bg-[#006C35] border border-[#006C35] hover:border-emerald-400 text-[#00A36C] text-[9px] font-black uppercase transition-all cursor-pointer hover:scale-[1.01]"
              >
                {language === 'ar' ? '🟢 فتح المسار الشمالي' : '🟢 OPEN NORTH ROUTE'}
              </button>
              <button
                onClick={() => handleDirectAction('south', 'closed')}
                className="py-2 rounded-xl bg-[#1E5AA8] border border-[#1E5AA8] hover:border-rose-400 text-[#1E5AA8] text-[9px] font-black uppercase transition-all cursor-pointer hover:scale-[1.01]"
              >
                {language === 'ar' ? '🔴 إغلاق المسار الجنوبي' : '🔴 CLOSE SOUTH ROUTE'}
              </button>
              <button
                onClick={() => handleDirectAction('east', 'open')}
                className="py-2 rounded-xl bg-[#006C35] border border-[#006C35] hover:border-emerald-400 text-[#00A36C] text-[9px] font-black uppercase transition-all cursor-pointer hover:scale-[1.01]"
              >
                {language === 'ar' ? '🟢 فتح المسار الشرقي' : '🟢 OPEN EAST ROUTE'}
              </button>
              <button
                onClick={() => handleDirectAction('west', 'closed')}
                className="py-2 rounded-xl bg-[#1E5AA8] border border-[#1E5AA8] hover:border-rose-400 text-[#1E5AA8] text-[9px] font-black uppercase transition-all cursor-pointer hover:scale-[1.01]"
              >
                {language === 'ar' ? '🔴 إغلاق المسار الغربي' : '🔴 CLOSE WEST ROUTE'}
              </button>
            </div>

            <button
              onClick={handleApplyZoneSettings}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#006C35] to-[#1E5AA8] border border-[#006C35] text-[#00A36C] font-black text-[10px] tracking-widest uppercase hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer mt-4"
            >
              {language === 'ar' ? 'تطبيق الأمر على المنطقة' : 'APPLY GRID INSTRUCTIONS'}
            </button>
          </div>

        </div>

        {/* Right Pathway corridors status table (5 Columns) */}
        <div className="lg:col-span-6 p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between min-h-[230px]">
          <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase mb-3">
            {language === 'ar' ? 'حالة المسارات في المنطقة المحددة' : 'Grid Pathway Corridor Matrix'}
          </h3>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-[10px] text-slate-800">
              <thead className="bg-white font-black uppercase tracking-wider text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-2.5">{language === 'ar' ? 'المسار' : 'Corridor'}</th>
                  <th className="p-2.5">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="p-2.5">{language === 'ar' ? 'الكثافة' : 'Occupancy'}</th>
                  <th className="p-2.5">{language === 'ar' ? 'اتجاه الحركة' : 'Flow Direction'}</th>
                  <th className="p-2.5">{language === 'ar' ? 'الإجراء' : 'Trigger'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {routeCorridors.map((route) => {
                  let statusBadge = 'text-[#00A36C] bg-[#006C35] border-[#006C35]';
                  let statusLabel = language === 'ar' ? 'مفتوح' : 'Open';

                  if (route.status === 'closed') {
                    statusBadge = 'text-[#1E5AA8] bg-[#1E5AA8] border-[#1E5AA8]';
                    statusLabel = language === 'ar' ? 'مغلق' : 'Closed';
                  } else if (route.status === 'crowded') {
                    statusBadge = 'text-[#2980B9] bg-[#2980B9] border-[#2980B9]';
                    statusLabel = language === 'ar' ? 'مزدحم' : 'Crowded';
                  }

                  return (
                    <tr key={route.id} className="hover:bg-white transition-colors">
                      <td className="p-2.5 font-black text-slate-900">{language === 'ar' ? route.nameAr : route.nameEn}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded border font-bold text-[8px] tracking-wider uppercase ${statusBadge}`}>
                          {statusLabel}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono font-bold">{route.density}%</td>
                      <td className={`p-2.5 font-mono font-bold tracking-widest ${route.status === 'closed' ? 'text-[#1E5AA8] animate-pulse' : 'text-[#00A36C]'}`}>
                        {route.flow}
                      </td>
                      <td className="p-2.5">
                        <button
                          onClick={() => toggleRoute(route.id)}
                          className={`px-2 py-1 rounded text-[8px] font-black uppercase cursor-pointer border ${route.status === 'open' ? 'bg-[#1E5AA8] border-[#1E5AA8] text-[#1E5AA8]' : 'bg-[#006C35] border-[#006C35] text-[#00A36C]'}`}
                        >
                          {route.status === 'open' ? (language === 'ar' ? 'إغلاق' : 'CLOSE') : (language === 'ar' ? 'فتح' : 'OPEN')}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* ─── Gauge, Recharts timeline & AI Alerts row ─── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* General Density Gauge (3 Columns) */}
        <div className="lg:col-span-3 p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between items-center h-[260px]">
          <h3 className="text-xs font-black tracking-wide text-slate-600 uppercase w-full">
            {language === 'ar' ? 'مؤشر كثافة الحشود العام' : 'Global Occupancy Gauge'}
          </h3>

          {/* Stylized custom SVG Gauge */}
          <div className="relative w-44 h-24 flex items-center justify-center mt-4">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              {/* Dark base track path */}
              <path
                d="M 10,50 A 40,40 0 0,1 90,50"
                fill="none"
                stroke="#1e293b"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Highlight colored gradient path based on density */}
              <path
                d="M 10,50 A 40,40 0 0,1 90,50"
                fill="none"
                stroke="url(#gauge-gradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="126"
                strokeDashoffset={126 - (126 * 78) / 100} // Matches 78% General Occupancy
              />
              <defs>
                <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00A36C" />
                  <stop offset="60%" stopColor="#2980B9" />
                  <stop offset="100%" stopColor="#1E5AA8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="text-2xl font-black font-mono text-slate-900 text-glow-blue">78%</span>
              <span className="text-[9px] font-black text-[#2980B9] uppercase tracking-widest mt-0.5">
                {language === 'ar' ? 'كثافة متوسطة' : 'MODERATE OCCUPANCY'}
              </span>
            </div>
          </div>

          <div className="flex justify-between w-full text-[9px] font-mono text-slate-500 font-bold border-t border-slate-200 pt-3">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Timeline Line chart (5 Columns) */}
        <div className="lg:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white flex flex-col h-[260px]">
          <h3 className="text-xs font-black tracking-wide text-slate-600 uppercase mb-4 flex items-center gap-1.5">
            <TrendingUp size={14} className="text-[#1E5AA8]" />
            <span>{language === 'ar' ? 'مخطط الكثافة التشغيلي الزمني' : 'Timeline Grid Density forecasting'}</span>
          </h3>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
                <YAxis stroke="#94a3b8" fontSize={9} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020817', border: '1px solid #1e293b', borderRadius: '8px' }}
                  labelStyle={{ color: '#f8fafc', fontSize: '10px', fontWeight: 'bold' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Line
                  type="monotone"
                  dataKey="density"
                  name={language === 'ar' ? 'الكثافة التشغيلية %' : 'Corridor Density %'}
                  stroke="#2980B9"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#020817', stroke: '#2980B9', strokeWidth: 1.5 }}
                  activeDot={{ r: 5, fill: '#2980B9', stroke: '#020817' }}
                />
                {/* Recharts coordinate ReferenceDot for 10:30 highlighted in the reference picture */}
                <ReferenceDot x="10:30" y={78} r={5} fill="#00A36C" stroke="#020817" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI diagnostic alerts and notification desk (4 Columns) */}
        <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between h-[260px]">
          <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase mb-3.5 flex items-center gap-1.5">
            <BrainCircuit size={16} className="text-[#1E5AA8] animate-pulse" />
            <span>{language === 'ar' ? 'تنبيهات الذكاء الاصطناعي (AI)' : 'AI Diagnostic Warnings'}</span>
          </h3>

          <div className="space-y-2.5 overflow-y-auto flex-1 max-h-[160px] px-1">
            {aiAlerts.map((alert) => {
              let alertBorder = 'border-slate-200 bg-white';
              let indicatorDot = 'bg-emerald-400';
              let alertText = language === 'ar' ? alert.textAr : alert.textEn;

              if (alert.type === 'danger') {
                alertBorder = 'border-[#1E5AA8] bg-[#1E5AA8]/15 text-rose-300';
                indicatorDot = 'bg-[#1E5AA8] animate-ping';
              } else if (alert.type === 'warning') {
                alertBorder = 'border-[#2980B9] bg-[#2980B9]/15 text-amber-300';
                indicatorDot = 'bg-amber-400';
              }

              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-xl border text-[10px] font-bold flex items-start gap-2.5 relative overflow-hidden transition-all duration-300 hover:border-slate-200 ${alertBorder}`}
                >
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${indicatorDot}`} />
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="leading-snug">{alertText}</p>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 font-bold self-start mt-0.5">{alert.time}</span>
                </div>
              );
            })}
          </div>

          <span className="text-[8px] text-slate-500 block text-center mt-3 border-t border-slate-200 pt-3">
            💡 {language === 'ar' ? 'خوارزميات التنبؤ تدعم التحليل في الخلفية بنسبة دقة 99.8%' : 'Telemetry predictive matrix calibrated at 99.8%'}
          </span>
        </div>

      </section>


    </div>
  );
}

