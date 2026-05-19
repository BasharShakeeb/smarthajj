"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import { 
  FileBarChart2, 
  FileText, 
  Download, 
  TrendingUp, 
  Clock, 
  Activity,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';

export default function ReportsPage() {
  const { language } = useStore();
  const t = translations[language];

  // Mock charts flow metrics datasets
  const dailyFlowData = [
    { hour: '06:00', pilgrims: 450000, capacity: 600000 },
    { hour: '09:00', pilgrims: 850000, capacity: 600000 },
    { hour: '12:00', pilgrims: 1200000, capacity: 800000 },
    { hour: '15:00', pilgrims: 950000, capacity: 800000 },
    { hour: '18:00', pilgrims: 600000, capacity: 600000 },
    { hour: '21:00', pilgrims: 480000, capacity: 600000 }
  ];

  const zoneFlowData = [
    { zone: language === 'ar' ? 'منى (منطقة 1)' : 'Mina (Z-1)', pilgrims: 750000, alerts: 12 },
    { zone: language === 'ar' ? 'مزدلفة (منطقة 2)' : 'Muzdalifah (Z-2)', pilgrims: 580000, alerts: 4 },
    { zone: language === 'ar' ? 'عرفات (منطقة 3)' : 'Arafat (Z-3)', pilgrims: 950000, alerts: 19 },
    { zone: language === 'ar' ? 'الجمرات (منطقة 4)' : 'Jamarat (Z-4)', pilgrims: 1100000, alerts: 27 },
    { zone: language === 'ar' ? 'الحرم (منطقة 5)' : 'Haram (Z-5)', pilgrims: 850000, alerts: 8 }
  ];

  const handleExportPDF = () => {
    useStore.getState().addToast(
      language === 'ar'
        ? '📄 جاري تجهيز وتحميل تقرير الأداء الميداني بصيغة PDF...'
        : '📄 Generating and exporting PDF operational report...',
      'success'
    );
  };

  const handleExportCSV = () => {
    useStore.getState().addToast(
      language === 'ar'
        ? '📊 جاري تصدير وحفظ جدول البيانات بصيغة CSV...'
        : '📊 Exporting raw sensor metrics dataset to CSV format...',
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-slide-up">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass border border-slate-200 bg-white">
        <div>
          <span className="text-[10px] font-black text-[#00A36C] tracking-wider block uppercase">SYSTEM METRIC LOGGER</span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{t.chartsTitle}</h1>
          <p className="text-xs text-slate-600 font-semibold">{t.reportsDesc}</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 hover:text-[#00A36C] font-black text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5"
          >
            <FileText size={14} />
            <span>{t.pdfExport}</span>
          </button>
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#006C35] to-[#1E5AA8] hover:opacity-90 border border-slate-200 text-white font-black text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 animate-pulse"
          >
            <Download size={14} />
            <span>{t.csvExport}</span>
          </button>
        </div>
      </header>

      {/* Main Grid Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Area Chart (2 Columns) */}
        <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-200 bg-white flex flex-col h-[350px]">
          <h3 className="text-xs font-black tracking-wide text-slate-600 uppercase mb-4 flex items-center gap-1.5">
            <Calendar size={14} className="text-[#1E5AA8]" />
            <span>{t.dailyReport}</span>
          </h3>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyFlowData}>
                <defs>
                  <linearGradient id="colorPilgrims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A36C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00A36C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCapacity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E5AA8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1E5AA8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={9} />
                <YAxis stroke="#64748b" fontSize={9} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} 
                  labelStyle={{ color: '#0f172a', fontSize: '10px', fontWeight: 'bold' }}
                  itemStyle={{ fontSize: '10px', color: '#334155' }}
                />
                <Area type="monotone" dataKey="pilgrims" name={language === 'ar' ? 'الحجاج النشطين' : 'Active Pilgrims'} stroke="#00A36C" fillOpacity={1} fill="url(#colorPilgrims)" />
                <Area type="monotone" dataKey="capacity" name={language === 'ar' ? 'السعة الاستيعابية للمسارات' : 'Safe Capacity limit'} stroke="#1E5AA8" fillOpacity={1} fill="url(#colorCapacity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly aggregated reports metrics (1 Column) */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
          <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase mb-4 flex items-center gap-1.5">
            <TrendingUp size={14} className="text-[#1E5AA8]" />
            <span>{t.weeklyReport}</span>
          </h3>

          <div className="space-y-4">
            {[
              { label: language === 'ar' ? 'متوسط سرعة دفق الحشود' : 'Average Flow Speed', value: '4.8 km/h', desc: language === 'ar' ? 'ضمن الحدود الآمنة التشغيلية' : 'Optimal safe range' },
              { label: language === 'ar' ? 'أقصى نسبة ازدحام مرصودة' : 'Peak Density Recorded', value: '82%', desc: language === 'ar' ? 'يوم 10 ذو الحجة - منى' : '10th Dul-Hijjah - Mina' },
              { label: language === 'ar' ? 'فعالية أنظمة الإرشاد الضوئي' : 'LED Guidance Effectiveness', value: '99.4%', desc: language === 'ar' ? 'مؤشر رضا وسلوك الحجاج' : 'Pilgrim compliance index' }
            ].map((metric, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1 relative">
                <span className="text-[9px] font-black text-slate-600 block tracking-wide">{metric.label}</span>
                <span className="text-base font-mono font-black text-slate-900 block">{metric.value}</span>
                <span className="text-[8px] text-[#006C35] block font-semibold">{metric.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Zone Bar Chart (2 Columns) */}
        <div className="lg:col-span-2 p-5 rounded-2xl border border-slate-200 bg-white flex flex-col h-[350px]">
          <h3 className="text-xs font-black tracking-wide text-slate-600 uppercase mb-4 flex items-center gap-1.5">
            <Layers size={14} className="text-[#006C35]" />
            <span>{language === 'ar' ? 'كثافة الحشود ومعدل التنبيهات حسب المناطق' : 'Crowd Density & Active Alerts by Zone'}</span>
          </h3>

          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zoneFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                <XAxis dataKey="zone" stroke="#64748b" fontSize={9} />
                <YAxis stroke="#64748b" fontSize={9} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }} 
                  labelStyle={{ color: '#0f172a', fontSize: '10px', fontWeight: 'bold' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="pilgrims" name={language === 'ar' ? 'عدد الحجاج النشطين' : 'Active Pilgrims'} fill="#1E5AA8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alerts" name={language === 'ar' ? 'التنبيهات النشطة' : 'Active Alerts'} fill="#006C35" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bracelet Health Statistics (1 Column) */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between h-[350px]">
          <div>
            <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase mb-4 flex items-center gap-1.5">
              <Activity size={14} className="text-[#006C35]" />
              <span>{language === 'ar' ? 'مؤشرات حالة الأساور الذكية' : 'Smart Bracelet Health Indices'}</span>
            </h3>

            <div className="space-y-4">
              {[
                { label: language === 'ar' ? 'متوسط طاقة البطارية' : 'Average Battery Status', value: '94.2%', color: 'w-[94.2%] bg-emerald-500' },
                { label: language === 'ar' ? 'معدل الاتصال بالشبكة' : 'Network Connection Rate', value: '98.7%', color: 'w-[98.7%] bg-blue-500' },
                { label: language === 'ar' ? 'سلامة المستشعرات الحيوية' : 'Vital Sensors Integrity', value: '99.1%', color: 'w-[99.1%] bg-[#006C35]' }
              ].map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-slate-600">{metric.label}</span>
                    <span className="text-slate-900">{metric.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${metric.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>{language === 'ar' ? 'آخر تحديث تلقائي' : 'Last auto-sync'}</span>
            <span className="font-mono text-[10px] text-[#00A36C] animate-pulse">● {language === 'ar' ? 'منذ دقيقة' : '1m ago'}</span>
          </div>
        </div>

      </div>

    </div>
  );
}

