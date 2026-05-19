"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import {
  Map,
  Plus,
  Clock,
  TrendingUp,
  BrainCircuit,
  Settings2,
  RefreshCw,
  Lock,
  Unlock,
  Route as RouteIcon,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Trash2,
  Edit2,
  Filter,
  Eye,
  MoreHorizontal,
  CloudSun,
  Maximize2,
  Minus,
  Navigation,
  Info
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, ReferenceDot, PieChart, Pie, Cell } from 'recharts';

export default function RoutesPage() {
  const { language, routes, toggleRouteStatus, addToast } = useStore();
  const t = translations[language];

  // Time state
  const [time, setTime] = useState('10:30:45');
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, [language]);

  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Stats data
  const routeStats = [
    { value: 95, color: '#006C35', labelAr: 'مسارات مفتوحة', labelEn: 'Open Routes', percent: '74%' },
    { value: 27, color: '#2980B9', labelAr: 'ازدحام متوسط', labelEn: 'Busy Routes', percent: '21%' },
    { value: 6, color: '#1E5AA8', labelAr: 'مسارات مغلقة', labelEn: 'Closed Routes', percent: '5%' },
  ];

  // Table Data
  const tableData = [
    { id: 'R-001', region: '1 → 3', typeAr: 'تدفق آمن', typeEn: 'Open', typeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200', statusAr: 'تفويج نشط / تدفق آمن', statusEn: 'Active Dispatch / Safe Flow', speed: '4.2', eta: '15', length: '2.4', time: '10:28:10' },
    { id: 'R-002', region: '2 → 3', typeAr: 'انتظار', typeEn: 'Moderate', typeColor: 'text-sky-700 bg-sky-50 border-sky-200', statusAr: 'تفويج مجدول / انتظار', statusEn: 'Scheduled / Standby', speed: '2.8', eta: '22', length: '3.1', time: '10:29:05' },
    { id: 'R-003', region: '3 → 5', typeAr: 'مغلق', typeEn: 'Closed', typeColor: 'text-blue-700 bg-blue-50 border-blue-200', statusAr: 'كثافة عالية / تباطؤ الحركة', statusEn: 'High Density / Slowdown', speed: '1.2', eta: '35', length: '2.7', time: '10:27:45' },
    { id: 'R-004', region: '1 → 4', typeAr: 'تدفق آمن', typeEn: 'Open', typeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200', statusAr: 'تفويج نشط / تدفق آمن', statusEn: 'Active Dispatch / Safe Flow', speed: '4.5', eta: '12', length: '2.0', time: '10:30:01' },
    { id: 'R-005', region: '4 → 5', typeAr: 'انتظار', typeEn: 'Moderate', typeColor: 'text-sky-700 bg-sky-50 border-sky-200', statusAr: 'تفويج مجدول / انتظار', statusEn: 'Scheduled / Standby', speed: '2.6', eta: '20', length: '2.9', time: '10:29:30' },
  ];

  // Charts Data
  const speedChartData = [
    { time: '00:00', value: 1.5 }, { time: '04:00', value: 2.1 }, { time: '08:00', value: 3.5 },
    { time: '12:00', value: 4.0 }, { time: '16:00', value: 3.2 }, { time: '20:00', value: 4.5 }, { time: '24:00', value: 3.8 }
  ];

  const etaChartData = [
    { time: '00:00', value: 12 }, { time: '04:00', value: 18 }, { time: '08:00', value: 25 },
    { time: '12:00', value: 18 }, { time: '16:00', value: 35 }, { time: '20:00', value: 22 }, { time: '24:00', value: 15 }
  ];

  return (
    <div className={`space-y-6 pb-12 animate-slide-up ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0B1120] p-6 overflow-y-auto' : ''}`}>

      {/* ─── Header & Top Stats ─── */}
      <div className="flex flex-col gap-6">

        {/* Page Title Header (Matches Mockup) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-wide">
              {language === 'ar' ? 'المسارات الذكية' : 'Smart Routes'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-slate-900 font-mono text-sm font-black tracking-widest block">{time}</span>
              <span className="text-[10px] text-slate-600 font-bold uppercase">1447/11/13 هـ</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-slate-200 flex items-center justify-center text-slate-800 relative">
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <Info size={16} />
            </div>
          </div>
        </div>

        {/* 6 Top Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-white/95 shadow-lg border border-slate-200 backdrop-blur-md flex flex-col justify-between h-[90px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-600">{language === 'ar' ? 'إجمالي المسارات' : 'Total Routes'}</span>
              <RouteIcon size={16} className="text-slate-500" />
            </div>
            <span className="text-2xl font-black font-mono text-slate-900">128</span>
          </div>

          <div className="p-4 rounded-xl bg-white/95 shadow-lg border border-slate-200 backdrop-blur-md flex flex-col justify-between h-[90px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-600">{language === 'ar' ? 'مسارات مفتوحة' : 'Open Routes'}</span>
              <CheckCircle size={16} className="text-[#006C35]" />
            </div>
            <span className="text-2xl font-black font-mono text-slate-900">95</span>
          </div>

          <div className="p-4 rounded-xl bg-white/95 shadow-lg border border-slate-200 backdrop-blur-md flex flex-col justify-between h-[90px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-600">{language === 'ar' ? 'مسارات مزدحمة' : 'Busy Routes'}</span>
              <AlertTriangle size={16} className="text-[#1E5AA8]" />
            </div>
            <span className="text-2xl font-black font-mono text-slate-900">27</span>
          </div>

          <div className="p-4 rounded-xl bg-white/95 shadow-lg border border-slate-200 backdrop-blur-md flex flex-col justify-between h-[90px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-600">{language === 'ar' ? 'مسارات مغلقة' : 'Closed Routes'}</span>
              <XCircle size={16} className="text-[#94A3B8]" />
            </div>
            <span className="text-2xl font-black font-mono text-slate-900">6</span>
          </div>

          <div className="p-4 rounded-xl bg-white/95 shadow-lg border border-slate-200 backdrop-blur-md flex flex-col justify-between h-[90px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-600">{language === 'ar' ? 'متوسط سرعة الحركة' : 'Average Speed'}</span>
              <Activity size={16} className="text-[#006C35]" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-slate-900">3.2</span>
              <span className="text-[10px] text-slate-600 font-bold">{language === 'ar' ? 'كم/س' : 'km/h'}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/95 shadow-lg border border-slate-200 backdrop-blur-md flex flex-col justify-between h-[90px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-600">{language === 'ar' ? 'متوسط وقت الوصول' : 'Avg. ETA'}</span>
              <Clock size={16} className="text-[#2980B9]" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-slate-900">18</span>
              <span className="text-[10px] text-slate-600 font-bold">{language === 'ar' ? 'دقيقة' : 'min'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ─── Main Content Grid ─── */}
      <div className="flex flex-col gap-6">

        {/* Full-width column for Map */}
        <div className="w-full flex flex-col gap-6">

          {/* Smart Routes Map Container (Full Width) */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden relative h-[70vh] min-h-[550px]">
            {/* Map UI Elements */}


            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <div className="flex flex-col px-3 py-2 rounded-xl bg-white/95 shadow-lg border border-slate-200 backdrop-blur-md">
                <span className="text-[10px] font-black text-slate-700 mb-1.5 border-b border-slate-100 pb-1">{language === 'ar' ? 'مؤشرات التفويج والتدفق الميداني' : 'Dispatching & Flow Status'}</span>
                <div className="flex flex-col gap-1.5 text-[9px] font-bold text-slate-800">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#006C35] shadow-[0_0_6px_#006C35]" />{language === 'ar' ? 'تفويج نشط / تدفق آمن' : 'Active Dispatch / Safe Flow'}</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2980B9] shadow-[0_0_6px_#2980B9]" />{language === 'ar' ? 'تفويج مجدول / انتظار' : 'Scheduled / Standby'}</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1E5AA8] shadow-[0_0_6px_#1E5AA8]" />{language === 'ar' ? 'كثافة عالية / تباطؤ الحركة' : 'High Density / Slowdown'}</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />{language === 'ar' ? 'طوارئ / مسار مغلق' : 'Emergency / Closed'}</span>
                </div>
              </div>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1">
              <div className="flex flex-col rounded-xl bg-white/95 shadow-md border border-slate-200 overflow-hidden backdrop-blur-md">
                <button onClick={() => setZoom(prev => Math.min(5, prev + 0.5))} className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-b border-slate-100 transition-colors"><Plus size={16} /></button>
                <button onClick={() => setZoom(prev => Math.max(1, prev - 0.5))} className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-b border-slate-100 transition-colors"><Minus size={16} /></button>
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors"><Maximize2 size={16} /></button>
              </div>
            </div>

            {/* Map Render replaced with Static Fully Rendered Dashboard Hero Image */}
            <div className="flex-1 w-full h-full relative bg-[#0B1120] overflow-hidden flex items-center justify-center">
              {/* Map image overlay */}
              <motion.div
                className="absolute inset-0 bg-contain bg-no-repeat bg-center select-none origin-center"
                style={{ backgroundImage: `url('/mina_hero_map.png')` }}
                animate={{ scale: zoom }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Table, Charts, Controls */}
        <div className="flex flex-col gap-6">

          {/* Main Area (Full Width) */}
          <div className="w-full flex flex-col gap-6">

            {/* Smart Routes Data Table */}
            <div className="rounded-2xl border border-slate-200 bg-white flex flex-col overflow-hidden min-h-[300px]">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-[13px] font-black text-slate-900">{language === 'ar' ? 'قائمة المسارات الذكية' : 'Smart Routes List'}</h3>
              </div>
              <div className="overflow-x-auto flex-1 p-4 pt-0">
                <table className="w-full text-left text-[11px] text-slate-800">
                  <thead className="text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-bold">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                      <th className="p-3 font-bold">{language === 'ar' ? 'آخر تحديث' : 'Last Update'}</th>
                      <th className="p-3 font-bold">{language === 'ar' ? 'الطول' : 'Length'}</th>
                      <th className="p-3 font-bold">{language === 'ar' ? 'وقت الوصول المتوقع' : 'ETA'}</th>
                      <th className="p-3 font-bold">{language === 'ar' ? 'سرعة الحركة' : 'Speed'}</th>
                      <th className="p-3 font-bold">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                      <th className="p-3 font-bold">{language === 'ar' ? 'نوع المسار' : 'Type'}</th>
                      <th className="p-3 font-bold">{language === 'ar' ? 'المنطقة' : 'Region'}</th>
                      <th className="p-3 font-bold">{language === 'ar' ? 'رقم المسار' : 'Route ID'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {tableData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white transition-colors">
                        <td className="p-3">
                          <div className="flex gap-1.5 text-slate-600">
                            <button className="p-1 hover:text-slate-900 transition-colors"><MoreHorizontal size={14} /></button>
                            <button className="p-1 hover:text-[#00A36C] transition-colors"><Edit2 size={14} /></button>
                            <button className="p-1 hover:text-[#1E5AA8] transition-colors"><Eye size={14} /></button>
                          </div>
                        </td>
                        <td className="p-3 font-mono">{row.time}</td>
                        <td className="p-3 font-mono">{row.length} {language === 'ar' ? 'كم' : 'km'}</td>
                        <td className="p-3 font-mono">{row.eta} {language === 'ar' ? 'دقيقة' : 'min'}</td>
                        <td className="p-3 font-mono">{row.speed} {language === 'ar' ? 'كم/س' : 'km/h'}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className={`w-2 h-2 rounded-full ${row.typeEn === 'Open' ? 'bg-[#006C35]' : row.typeEn === 'Moderate' ? 'bg-[#2980B9]' : 'bg-[#1E5AA8]'}`} />
                            <span className={row.typeEn === 'Open' ? 'text-slate-800' : row.typeEn === 'Moderate' ? 'text-[#2980B9]' : 'text-[#1E5AA8]'}>
                              {language === 'ar' ? row.statusAr : row.statusEn}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${row.typeColor}`}>
                            {language === 'ar' ? row.typeAr : row.typeEn}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold tracking-widest text-slate-900">{row.region}</td>
                        <td className="p-3 font-bold text-slate-800">{row.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Two Line Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[220px]">
              {/* Speed Chart */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col">
                <h3 className="text-[11px] font-black text-slate-800 text-center mb-4">{language === 'ar' ? 'سرعة الحركة المتوسطة' : 'Average Speed'}</h3>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={speedChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} domain={[0, 6]} />
                      <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155' }} itemStyle={{ fontSize: '10px' }} />
                      <Line type="monotone" dataKey="value" stroke="#006C35" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#006C35' }} />
                      <ReferenceDot x="16:00" y={3.2} r={4} fill="#006C35" stroke="#0F172A" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ETA Chart */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col">
                <h3 className="text-[11px] font-black text-slate-800 text-center mb-4">{language === 'ar' ? 'وقت الوصول المتوقع' : 'Expected ETA'}</h3>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={etaChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} domain={[0, 40]} />
                      <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155' }} itemStyle={{ fontSize: '10px' }} />
                      <Line type="monotone" dataKey="value" stroke="#1E5AA8" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#1E5AA8' }} />
                      <ReferenceDot x="12:00" y={18} r={4} fill="#1E5AA8" stroke="#0F172A" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM COLUMN: Controls & Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full">

            {/* Manage Routes */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col gap-4">
              <h3 className="text-sm font-black text-slate-900">{language === 'ar' ? 'إدارة المسارات' : 'Manage Routes'}</h3>
              <button className="w-full py-3 rounded-xl bg-[#006C35] hover:bg-[#006C35] text-slate-900 font-black text-[13px] transition-colors flex items-center justify-center gap-2">
                <Plus size={16} />
                <span>{language === 'ar' ? 'إنشاء مسار جديد' : 'Create New Route'}</span>
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-700 text-slate-800 font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5">
                  <Edit2 size={14} />
                  <span>{language === 'ar' ? 'تعديل المسارات' : 'Edit Routes'}</span>
                </button>
                <button className="py-2.5 rounded-xl border border-rose-900 bg-rose-950 hover:bg-rose-950 text-rose-400 font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5">
                  <Trash2 size={14} />
                  <span>{language === 'ar' ? 'حذف مسار' : 'Delete Route'}</span>
                </button>
              </div>
            </div>

            {/* Filter Routes */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col gap-4">
              <h3 className="text-sm font-black text-slate-900">{language === 'ar' ? 'تصفية المسارات' : 'Filter Routes'}</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select className="w-full appearance-none py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[11px] font-bold focus:outline-none focus:border-[#006C35] cursor-pointer">
                    <option>{language === 'ar' ? 'نوع المسار' : 'Route Type'}</option>
                    <option>مفتوح</option>
                    <option>مغلق</option>
                  </select>
                  <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="w-full appearance-none py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[11px] font-bold focus:outline-none focus:border-[#006C35] cursor-pointer">
                    <option>{language === 'ar' ? 'حالة المسار' : 'Route Status'}</option>
                    <option>مزدحم</option>
                    <option>سالك</option>
                  </select>
                  <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
              <div className="relative">
                <select className="w-full appearance-none py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[11px] font-bold focus:outline-none focus:border-[#006C35] cursor-pointer">
                  <option>{language === 'ar' ? 'جميع المناطق' : 'All Regions'}</option>
                  <option>منطقة 1</option>
                  <option>منطقة 2</option>
                </select>
              </div>
            </div>

            {/* Route Statistics Chart */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col gap-4">
              <h3 className="text-sm font-black text-slate-900">{language === 'ar' ? 'إحصائيات المسارات' : 'Route Statistics'}</h3>
              <div className="flex items-center">
                <div className="w-[120px] h-[120px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={routeStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={55}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                      >
                        {routeStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-slate-900">128</span>
                    <span className="text-[9px] text-slate-600 font-bold">{language === 'ar' ? 'إجمالي' : 'Total'}</span>
                  </div>
                </div>
                <div className="flex-1 pl-4 space-y-2">
                  {routeStats.map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                        <span className="text-slate-800 font-bold">{language === 'ar' ? stat.labelAr : stat.labelEn}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-slate-900">{stat.value}</span>
                        <span className="text-slate-500">({stat.percent})</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="text-slate-800 font-bold">{language === 'ar' ? 'أخرى' : 'Other'}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-900">0</span>
                      <span className="text-slate-500">(0%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Create New Route Form Panel */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col gap-4">
              <h3 className="text-sm font-black text-slate-900">{language === 'ar' ? 'إنشاء مسار جديد' : 'Deploy New Route'}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-600 w-20">{language === 'ar' ? 'منطقة البداية' : 'Start Zone'}</span>
                  <select className="flex-1 appearance-none py-2 px-3 rounded-lg border border-slate-200 bg-[#0F172A] text-slate-800 text-[11px] font-bold">
                    <option>اختر منطقة</option>
                    <option>المنطقة 1</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-600 w-20">{language === 'ar' ? 'منطقة النهاية' : 'End Zone'}</span>
                  <select className="flex-1 appearance-none py-2 px-3 rounded-lg border border-slate-200 bg-[#0F172A] text-slate-800 text-[11px] font-bold">
                    <option>اختر منطقة</option>
                    <option>المنطقة 3</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-600 w-20">{language === 'ar' ? 'نوع المسار' : 'Route Type'}</span>
                  <div className="flex-1 flex gap-2">
                    <button className="flex-1 py-1.5 rounded bg-[#006C35] border border-[#006C35] text-[#00A36C] text-[10px] font-black">{language === 'ar' ? 'مفتوح' : 'Open'}</button>
                    <button className="flex-1 py-1.5 rounded bg-white border border-slate-200 text-slate-600 text-[10px] font-black">{language === 'ar' ? 'متوسط' : 'Moderate'}</button>
                    <button className="flex-1 py-1.5 rounded bg-white border border-slate-200 text-slate-600 text-[10px] font-black">{language === 'ar' ? 'مغلق' : 'Closed'}</button>
                  </div>
                </div>
                <button
                  className="w-full mt-2 py-2.5 rounded-xl bg-[#006C35] hover:bg-[#006C35] text-slate-900 font-black text-[12px] transition-colors"
                  onClick={() => addToast(language === 'ar' ? 'تم إنشاء المسار بنجاح' : 'Route Created', 'success')}
                >
                  {language === 'ar' ? 'إنشاء المسار' : 'Create Route'}
                </button>
              </div>
            </div>

            {/* Alerts / Notifications */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col gap-4 flex-1">
              <h3 className="text-sm font-black text-slate-900">{language === 'ar' ? 'أحدث التنبيهات المتعلقة بالمسارات' : 'Latest Route Alerts'}</h3>
              <div className="space-y-2.5 flex-1 overflow-y-auto">

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <AlertTriangle size={14} className="text-[#1E5AA8] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[11px] text-slate-800 font-bold">{language === 'ar' ? 'ازدحام عالي في المسار (5 ← 3) R-003' : 'High density on Route R-003 (5→3)'}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">10:29</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <AlertTriangle size={14} className="text-[#2980B9] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[11px] text-slate-800 font-bold">{language === 'ar' ? 'ازدحام متوسط في المسار (3 ← 2) R-002' : 'Moderate density on Route R-002 (3→2)'}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">10:28</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                  <Info size={14} className="text-[#00A36C] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[11px] text-slate-800 font-bold">{language === 'ar' ? 'تم فتح مسار جديد في المنطقة 4' : 'New route opened in Zone 4'}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">10:26</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

