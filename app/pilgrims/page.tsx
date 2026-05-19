"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import { 
  Users, Search, Heart, Battery, MapPin, Radio, 
  AlertTriangle, CheckCircle2, Eye, MoreHorizontal
} from 'lucide-react';

export default function PilgrimsPage() {
  const { language, pilgrims, triggerSOS } = useStore();
  const t = translations[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'safe' | 'warning' | 'danger'>('all');

  const filteredPilgrims = pilgrims.filter(p => {
    const matchesSearch = 
      p.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.braceletId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const safeCount = pilgrims.filter(p => p.status === 'safe').length;
  const warningCount = pilgrims.filter(p => p.status === 'warning').length;
  const dangerCount = pilgrims.filter(p => p.status === 'danger').length;

  return (
    <div className="space-y-6 pb-12 animate-slide-up">

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'قاعدة بيانات الحجاج' : 'Pilgrims Database'}
          </h1>
          <p className="text-[11px] text-slate-600 mt-1">
            {language === 'ar' ? 'البحث والمراقبة المستمرة للحالة الصحية ومواقع الحجاج' : 'Search & monitor pilgrim health status and locations'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[#1B3A5C] bg-white h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'إجمالي الحجاج' : 'Total Pilgrims'}</span>
            <Users size={16} className="text-slate-500" />
          </div>
          <span className="text-2xl font-black font-mono text-slate-900">{pilgrims.length}</span>
        </div>
        <div className="p-4 rounded-xl border border-[#006C35] bg-[#006C35]/5 h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'حالة آمنة' : 'Safe'}</span>
            <CheckCircle2 size={16} className="text-[#00A36C]" />
          </div>
          <span className="text-2xl font-black font-mono text-[#00A36C]">{safeCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-[#1E5AA8] bg-[#1E5AA8]/5 h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'تحذير' : 'Warning'}</span>
            <AlertTriangle size={16} className="text-[#2980B9]" />
          </div>
          <span className="text-2xl font-black font-mono text-[#2980B9]">{warningCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-[#1E5AA8] bg-[#1E5AA8]/5 h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'حالة طوارئ' : 'Emergency'}</span>
            <AlertTriangle size={16} className="text-[#1E5AA8]" />
          </div>
          <span className="text-2xl font-black font-mono text-[#1E5AA8]">{dangerCount}</span>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={language === 'ar' ? 'البحث بالاسم أو رقم السوار...' : 'Search by name or bracelet ID...'}
            className="w-full py-2.5 pr-9 pl-4 rounded-xl border border-[#1B3A5C] bg-white text-[12px] text-slate-800 font-bold placeholder-slate-400 focus:outline-none focus:border-[#006C35]"
          />
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-[#1B3A5C]">
          {(['all', 'safe', 'warning', 'danger'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide transition-all cursor-pointer ${statusFilter === st
                ? st === 'all' ? 'bg-white text-slate-900'
                : st === 'safe' ? 'bg-[#006C35] text-slate-900'
                : st === 'warning' ? 'bg-[#2980B9] text-slate-900'
                : 'bg-[#1E5AA8] text-slate-900'
                : 'text-slate-600 hover:text-slate-900'}`}
            >
              {st === 'all' ? (language === 'ar' ? 'الكل' : 'All')
                : st === 'safe' ? (language === 'ar' ? 'آمن' : 'Safe')
                : st === 'warning' ? (language === 'ar' ? 'تحذير' : 'Warning')
                : (language === 'ar' ? 'طوارئ' : 'Emergency')}
            </button>
          ))}
        </div>
      </div>

      {/* Pilgrim Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPilgrims.map(pilgrim => {
          const isSafe = pilgrim.status === 'safe';
          const isWarning = pilgrim.status === 'warning';
          const isDanger = pilgrim.status === 'danger';

          const borderColor = isDanger ? 'border-[#1E5AA8]' : isWarning ? 'border-[#2980B9]' : 'border-[#1B3A5C]';
          const statusLabel = isSafe ? (language === 'ar' ? 'آمن' : 'Safe') : isWarning ? (language === 'ar' ? 'تحذير' : 'Warning') : (language === 'ar' ? 'طوارئ' : 'Emergency');
          const statusBadge = isSafe ? 'text-[#00A36C] bg-[#006C35] border-[#006C35]' : isWarning ? 'text-[#2980B9] bg-[#1E5AA8] border-[#1E5AA8]' : 'text-[#1E5AA8] bg-[#1E5AA8] border-[#1E5AA8]';

          return (
            <div key={pilgrim.id} className={`p-5 rounded-2xl border ${borderColor} bg-white flex flex-col justify-between min-h-[240px]`}>
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#1B3A5C] flex items-center justify-center text-[#1E5AA8] text-xs font-black">
                    {pilgrim.id.split('-')[1]}
                  </div>
                  <div>
                    <h3 className="text-[13px] font-black text-slate-900">{language === 'ar' ? pilgrim.nameAr : pilgrim.nameEn}</h3>
                    <span className="text-[10px] font-mono text-slate-500">{pilgrim.braceletId}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase ${statusBadge}`}>
                  {statusLabel}
                </span>
              </div>

              {/* Details */}
              <div className="mt-3 space-y-1.5 text-[11px] font-bold text-slate-600">
                <p className="flex items-center gap-1.5">
                  <Users size={12} className="text-slate-500" />
                  {language === 'ar' ? pilgrim.groupAr : pilgrim.groupEn}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-slate-500" />
                  {language === 'ar' ? pilgrim.locationAr : pilgrim.locationEn}
                </p>
              </div>

              {/* Vitals */}
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#1B3A5C] pt-3 text-[9px] font-bold text-slate-500">
                <div className="space-y-0.5">
                  <span className="block uppercase">{language === 'ar' ? 'نبضات القلب' : 'Heart Rate'}</span>
                  <span className="text-slate-900 font-mono flex items-center gap-1">
                    <Heart size={10} className="text-[#1E5AA8]" />
                    {pilgrim.heartRate} bpm
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="block uppercase">{language === 'ar' ? 'ضغط الدم' : 'BP'}</span>
                  <span className="text-slate-900 font-mono">{pilgrim.bloodPressure}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block uppercase">{language === 'ar' ? 'البطارية' : 'Battery'}</span>
                  <span className="text-[#00A36C] font-mono flex items-center gap-1">
                    <Battery size={10} />
                    {pilgrim.battery}%
                  </span>
                </div>
              </div>

              {/* SOS Button */}
              {pilgrim.status !== 'danger' && (
                <button
                  onClick={() => triggerSOS(pilgrim.id)}
                  className="w-full py-2 rounded-xl bg-[#1E5AA8] hover:bg-[#1E5AA8] border border-[#1E5AA8] text-[#1E5AA8] font-black text-[10px] tracking-wider uppercase transition-all cursor-pointer mt-3"
                >
                  {language === 'ar' ? '⚠️ محاكاة إنذار طوارئ' : '⚠️ Simulate SOS Warning'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
