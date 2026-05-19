"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import { 
  Radio, Battery, Signal, MapPin, QrCode, Plus, CheckCircle2, 
  Settings2, Users, Search, Eye, MoreHorizontal, Wifi, WifiOff
} from 'lucide-react';

export default function BraceletsPage() {
  const { language, bracelets, pilgrims, linkBraceletToPilgrim } = useStore();
  const t = translations[language];

  const [selectedBraceletId, setSelectedBraceletId] = useState('');
  const [selectedPilgrimId, setSelectedPilgrimId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLinkDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBraceletId || !selectedPilgrimId) return;
    linkBraceletToPilgrim(selectedBraceletId, selectedPilgrimId);
    setSelectedBraceletId('');
    setSelectedPilgrimId('');
  };

  const onlineCount = bracelets.filter(b => b.status === 'online').length;
  const warningCount = bracelets.filter(b => b.status === 'warning').length;
  const criticalCount = bracelets.filter(b => b.status === 'critical').length;
  const offlineCount = bracelets.filter(b => b.status === 'offline').length;

  const filteredBracelets = bracelets.filter(b => {
    if (!searchQuery) return true;
    const pilgrim = pilgrims.find(p => p.id === b.pilgrimId);
    return b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pilgrim && (pilgrim.nameAr.includes(searchQuery) || pilgrim.nameEn.toLowerCase().includes(searchQuery.toLowerCase())));
  });

  return (
    <div className="space-y-6 pb-12 animate-slide-up">

      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'إدارة الأساور الذكية' : 'Smart Bracelets Management'}
          </h1>
          <p className="text-[11px] text-slate-600 mt-1">
            {language === 'ar' ? 'مراقبة أجهزة الأساور الذكية وحالة الاتصال والربط' : 'Monitor bracelet devices, connectivity status & linking'}
          </p>
        </div>
        <button
          className="px-4 py-2.5 rounded-xl bg-[#006C35] hover:bg-[#006C35] text-slate-900 font-black text-xs transition-colors flex items-center gap-1.5"
          onClick={() => document.getElementById('link-form-panel')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Plus size={14} />
          <span>{language === 'ar' ? 'ربط سوار جديد' : 'Link New Bracelet'}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[#1B3A5C] bg-white h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'إجمالي الأساور' : 'Total Bracelets'}</span>
            <Radio size={16} className="text-slate-500" />
          </div>
          <span className="text-2xl font-black font-mono text-slate-900">{bracelets.length}</span>
        </div>
        <div className="p-4 rounded-xl border border-[#006C35] bg-[#006C35]/5 h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'متصل' : 'Online'}</span>
            <Wifi size={16} className="text-[#00A36C]" />
          </div>
          <span className="text-2xl font-black font-mono text-[#00A36C]">{onlineCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-[#1E5AA8] bg-[#1E5AA8]/5 h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'تحذير / حرج' : 'Warning / Critical'}</span>
            <Signal size={16} className="text-[#1E5AA8]" />
          </div>
          <span className="text-2xl font-black font-mono text-[#1E5AA8]">{warningCount + criticalCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-[#1B3A5C] bg-white h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'غير متصل' : 'Offline'}</span>
            <WifiOff size={16} className="text-slate-500" />
          </div>
          <span className="text-2xl font-black font-mono text-slate-600">{offlineCount}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Devices Table (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">

          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'البحث برقم السوار أو اسم الحاج...' : 'Search by bracelet ID or pilgrim name...'}
              className="w-full py-2.5 pr-9 pl-4 rounded-xl border border-[#1B3A5C] bg-white text-[12px] text-slate-800 font-bold placeholder-slate-400 focus:outline-none focus:border-[#006C35]"
            />
          </div>

          {/* Devices List */}
          <div className="rounded-2xl border border-[#1B3A5C] bg-white overflow-hidden">
            <div className="p-4 border-b border-[#1B3A5C] flex items-center justify-between">
              <h3 className="text-[13px] font-black text-slate-900">
                {language === 'ar' ? 'الأجهزة والروابط النشطة' : 'Active Devices & Telemetry'}
              </h3>
              <span className="text-[10px] font-mono text-slate-500 font-bold">{filteredBracelets.length} {language === 'ar' ? 'جهاز' : 'devices'}</span>
            </div>

            <div className="divide-y divide-[#1B3A5C] max-h-[520px] overflow-y-auto">
              {filteredBracelets.map(b => {
                const pilgrim = pilgrims.find(p => p.id === b.pilgrimId);
                const statusConfig = b.status === 'online'
                  ? { badge: 'text-[#00A36C] bg-[#006C35] border-[#006C35]', label: language === 'ar' ? 'متصل' : 'Online', dot: '#00A36C' }
                  : b.status === 'warning'
                  ? { badge: 'text-[#2980B9] bg-[#1E5AA8] border-[#1E5AA8]', label: language === 'ar' ? 'تحذير' : 'Warning', dot: '#2980B9' }
                  : b.status === 'critical'
                  ? { badge: 'text-[#1E5AA8] bg-[#1E5AA8] border-[#1E5AA8] animate-pulse', label: language === 'ar' ? 'حرج' : 'Critical', dot: '#1E5AA8' }
                  : { badge: 'text-slate-500 bg-white border-slate-200', label: language === 'ar' ? 'غير متصل' : 'Offline', dot: '#64748b' };

                return (
                  <div key={b.id} className="p-4 hover:bg-white transition-colors flex flex-col md:flex-row md:items-center gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#1B3A5C] flex items-center justify-center flex-shrink-0">
                      <QrCode size={20} className="text-[#1E5AA8]" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[13px] font-black text-slate-900">{b.id}</span>
                        <span className="text-[10px] text-slate-500 font-bold">{b.model}</span>
                        <span className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase ${statusConfig.badge}`}>
                          {statusConfig.label}
                        </span>
                      </div>

                      {pilgrim ? (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#00A36C] font-bold">
                          <CheckCircle2 size={13} />
                          <span>{language === 'ar' ? pilgrim.nameAr : pilgrim.nameEn}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-bold">{language === 'ar' ? 'غير مرتبط بحاج' : 'Unlinked device'}</span>
                      )}

                      {b.status !== 'offline' && (
                        <div className="flex gap-4 text-[10px] font-bold text-slate-600 pt-1">
                          <span className="flex items-center gap-1">
                            <Battery size={12} className={b.battery < 30 ? 'text-[#1E5AA8]' : 'text-[#00A36C]'} />
                            {b.battery}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Signal size={12} className="text-[#1E5AA8]" />
                            {b.rssi} dBm
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} className="text-slate-500" />
                            {pilgrim ? (language === 'ar' ? pilgrim.locationAr : pilgrim.locationEn) : 'N/A'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="p-2 rounded-lg bg-white border border-[#1B3A5C] hover:border-[#1E5AA8] text-slate-600 hover:text-slate-900 transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="p-2 rounded-lg bg-white border border-[#1B3A5C] hover:border-[#1E5AA8] text-slate-600 hover:text-slate-900 transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Link Form (4 cols) */}
        <div id="link-form-panel" className="lg:col-span-4 flex flex-col gap-6">

          {/* Link Bracelet Form */}
          <div className="p-5 rounded-2xl border border-[#1B3A5C] bg-white">
            <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
              <Settings2 size={16} className="text-[#1E5AA8]" />
              {language === 'ar' ? 'ربط سوار جديد بحاج' : 'Link Bracelet to Pilgrim'}
            </h3>
            <form onSubmit={handleLinkDevice} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 block">{language === 'ar' ? 'رقم السوار الذكي' : 'Bracelet ID'}</label>
                <select
                  value={selectedBraceletId}
                  onChange={e => setSelectedBraceletId(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#1B3A5C] bg-white text-[12px] text-slate-800 font-bold focus:outline-none focus:border-[#006C35]"
                  required
                >
                  <option value="">{language === 'ar' ? '-- اختر السوار --' : '-- Select Device --'}</option>
                  {bracelets.filter(b => !b.pilgrimId && b.status !== 'offline').map(b => (
                    <option key={b.id} value={b.id}>{b.id} ({b.model})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-600 block">{language === 'ar' ? 'اختر الحاج' : 'Select Pilgrim'}</label>
                <select
                  value={selectedPilgrimId}
                  onChange={e => setSelectedPilgrimId(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#1B3A5C] bg-white text-[12px] text-slate-800 font-bold focus:outline-none focus:border-[#006C35]"
                  required
                >
                  <option value="">{language === 'ar' ? '-- اختر الحاج --' : '-- Select Pilgrim --'}</option>
                  {pilgrims.map(p => (
                    <option key={p.id} value={p.id}>{language === 'ar' ? p.nameAr : p.nameEn}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#006C35] hover:bg-[#006C35] text-slate-900 font-black text-[12px] transition-colors"
              >
                {language === 'ar' ? 'ربط السوار بالحاج' : 'Link Bracelet'}
              </button>
            </form>
          </div>

          {/* Device Summary */}
          <div className="p-5 rounded-2xl border border-[#1B3A5C] bg-white">
            <h3 className="text-sm font-black text-slate-900 mb-4">{language === 'ar' ? 'ملخص حالة الأجهزة' : 'Device Status Summary'}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#1B3A5C]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00A36C]" />
                  <span className="text-[11px] font-bold text-slate-600">{language === 'ar' ? 'أجهزة متصلة' : 'Online'}</span>
                </div>
                <span className="font-black text-[#00A36C] text-sm">{onlineCount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#1B3A5C]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2980B9]" />
                  <span className="text-[11px] font-bold text-slate-600">{language === 'ar' ? 'تحذير' : 'Warning'}</span>
                </div>
                <span className="font-black text-[#2980B9] text-sm">{warningCount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#1B3A5C]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1E5AA8]" />
                  <span className="text-[11px] font-bold text-slate-600">{language === 'ar' ? 'حرج' : 'Critical'}</span>
                </div>
                <span className="font-black text-[#1E5AA8] text-sm">{criticalCount}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                  <span className="text-[11px] font-bold text-slate-600">{language === 'ar' ? 'غير متصل' : 'Offline'}</span>
                </div>
                <span className="font-black text-slate-600 text-sm">{offlineCount}</span>
              </div>
            </div>
          </div>

          <p className="text-[9px] text-slate-500 leading-relaxed px-1">
            💡 {language === 'ar'
              ? 'ربط السوار يتيح البث المباشر للمؤشرات الحيوية (النبض، ضغط الدم، الموقع) مباشرة إلى لوحة التحكم.'
              : 'Linking enables real-time vitals streaming (HR, BP, GPS) directly to the dashboard.'}
          </p>
        </div>
      </div>
    </div>
  );
}
