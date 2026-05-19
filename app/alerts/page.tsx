"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import {
  AlertTriangle, ShieldAlert, CheckCircle2, Clock, MapPin, Activity,
  ShieldCheck, UserCheck, Radio, PhoneCall, Ambulance, Bell, Filter,
  Search, RefreshCw, XCircle, Info, Siren, Users, Eye, MoreHorizontal
} from 'lucide-react';

export default function AlertsPage() {
  const { language, incidents, resolveIncident, emergencyCount, addToast } = useStore();

  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [time, setTime] = useState('10:30:45');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, [language]);

  const filteredIncidents = incidents.filter(i => {
    const matchSeverity = severityFilter === 'all' || i.severity === severityFilter;
    const matchSearch = searchQuery === '' ||
      i.pilgrimNameAr.includes(searchQuery) ||
      i.pilgrimNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.locationAr.includes(searchQuery) ||
      i.typeAr.includes(searchQuery);
    return matchSeverity && matchSearch;
  });

  const criticalCount = incidents.filter(i => i.severity === 'critical' && i.status !== 'resolved').length;
  const warningCount = incidents.filter(i => i.severity === 'warning' && i.status !== 'resolved').length;
  const resolvedCount = incidents.filter(i => i.status === 'resolved').length;
  const pendingCount = incidents.filter(i => i.status !== 'resolved').length;

  const rescueTeams = [
    { nameAr: 'مسعف جوي - الفريق ألفا', nameEn: 'Air Ambulance – Alpha Team', statusAr: 'جاهز / انتظار', statusEn: 'Ready / Standby', color: 'text-[#00A36C]', dot: '#006C35' },
    { nameAr: 'الهلال الأحمر – فريق منى 3', nameEn: 'Red Crescent – Mina Team 3', statusAr: 'في موقع الحادث', statusEn: 'On Site', color: 'text-[#1E5AA8]', dot: '#1E5AA8' },
    { nameAr: 'الدفاع المدني – التدخل السريع', nameEn: 'Civil Defense – Special Ops', statusAr: 'متجه للموقع', statusEn: 'En Route', color: 'text-[#2980B9]', dot: '#2980B9' },
    { nameAr: 'الشرطة – دورية منى 7', nameEn: 'Police – Mina Patrol 7', statusAr: 'جاهز / انتظار', statusEn: 'Ready / Standby', color: 'text-[#00A36C]', dot: '#006C35' },
    { nameAr: 'طب الطوارئ – وحدة 12', nameEn: 'Emergency Med – Unit 12', statusAr: 'عائد إلى القاعدة', statusEn: 'Returning', color: 'text-slate-600', dot: '#64748b' },
  ];

  const recentLogs = [
    { timeStr: '10:29', msgAr: 'تم إرسال فريق الإسعاف إلى منطقة 5', msgEn: 'Ambulance team dispatched to Zone 5', type: 'danger' },
    { timeStr: '10:27', msgAr: 'تم معالجة حالة الضغط في منطقة 2', msgEn: 'Pressure case in Zone 2 resolved', type: 'success' },
    { timeStr: '10:25', msgAr: 'إنذار مبكر: كثافة متزايدة في منطقة 3', msgEn: 'Early warning: Rising density in Zone 3', type: 'warning' },
    { timeStr: '10:20', msgAr: 'تفعيل خطة الطوارئ الجزئية – مستوى 2', msgEn: 'Partial emergency plan activated – Level 2', type: 'danger' },
    { timeStr: '10:15', msgAr: 'اكتمال تموضع فرق الإنقاذ في المواقع', msgEn: 'Rescue teams fully positioned', type: 'success' },
  ];

  const getSeverityConfig = (severity: string) => {
    if (severity === 'critical') return { badgeClass: 'text-white bg-[#DC2626] border-[#DC2626]', dot: '#DC2626', labelAr: 'حرج', labelEn: 'Critical', textClass: 'text-[#DC2626]' };
    if (severity === 'warning') return { badgeClass: 'text-white bg-[#2980B9] border-[#2980B9]', dot: '#2980B9', labelAr: 'تحذير', labelEn: 'Warning', textClass: 'text-[#2980B9]' };
    return { badgeClass: 'text-white bg-[#1E5AA8] border-[#1E5AA8]', dot: '#1E5AA8', labelAr: 'معلومة', labelEn: 'Info', textClass: 'text-[#1E5AA8]' };
  };

  return (
    <div className="space-y-6 pb-12 animate-slide-up">

      {/* ─── Page Title ─── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'إدارة الطوارئ والحوادث' : 'Emergency & Incidents'}
          </h1>
          <p className="text-[11px] text-slate-600 mt-1">
            {language === 'ar' ? 'مركز التحكم المتكامل للبلاغات والاستجابة الفورية' : 'Integrated Command Center for Alerts & Rapid Response'}
          </p>
        </div>
      </div>

      {/* ─── Top Stats Cards ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-white h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'إجمالي البلاغات' : 'Total Alerts'}</span>
            <Bell size={16} className="text-slate-500" />
          </div>
          <span className="text-2xl font-black font-mono text-slate-900">{incidents.length}</span>
        </div>
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'بلاغات حرجة' : 'Critical'}</span>
            <AlertTriangle size={16} className="text-[#DC2626]" />
          </div>
          <span className="text-2xl font-black font-mono text-[#DC2626]">{criticalCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-[#2980B9] bg-[#2980B9]/5 h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'تحذيرات نشطة' : 'Active Warnings'}</span>
            <ShieldAlert size={16} className="text-[#2980B9]" />
          </div>
          <span className="text-2xl font-black font-mono text-[#2980B9]">{warningCount}</span>
        </div>
        <div className="p-4 rounded-xl border border-[#006C35] bg-[#006C35]/5 h-[90px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-600">{language === 'ar' ? 'تم معالجتها' : 'Resolved'}</span>
            <CheckCircle2 size={16} className="text-[#00A36C]" />
          </div>
          <span className="text-2xl font-black font-mono text-[#00A36C]">{resolvedCount}</span>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="flex flex-col gap-6">

        {/* FULL WIDTH: Incidents List */}
        <div className="w-full flex flex-col gap-6">

          {/* Search + Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'البحث في البلاغات...' : 'Search alerts...'}
                className="w-full py-2.5 pr-9 pl-4 rounded-xl border border-slate-200 bg-white text-[12px] text-slate-800 font-bold placeholder-slate-400 focus:outline-none focus:border-[#006C35]"
              />
            </div>
            <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
              {(['all', 'critical', 'warning', 'info'] as const).map(sev => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide transition-all cursor-pointer ${severityFilter === sev
                    ? sev === 'all' ? 'bg-slate-600 text-white'
                    : sev === 'critical' ? 'bg-[#DC2626] text-white'
                    : sev === 'warning' ? 'bg-[#2980B9] text-white'
                    : 'bg-[#1E5AA8] text-white'
                    : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {sev === 'all' ? (language === 'ar' ? 'الكل' : 'All')
                    : sev === 'critical' ? (language === 'ar' ? 'حرج' : 'Critical')
                    : sev === 'warning' ? (language === 'ar' ? 'تحذير' : 'Warning')
                    : (language === 'ar' ? 'معلومة' : 'Info')}
                </button>
              ))}
            </div>
          </div>

          {/* Incidents Table */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-[13px] font-black text-slate-900">
                {language === 'ar' ? 'قائمة البلاغات والحوادث' : 'Alerts & Incidents List'}
              </h3>
              <span className="text-[10px] font-mono text-slate-500 font-bold">
                {filteredIncidents.length} {language === 'ar' ? 'بلاغ' : 'records'}
              </span>
            </div>

            <div className="divide-y divide-slate-700 max-h-[520px] overflow-y-auto">
              {filteredIncidents.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center gap-3">
                  <CheckCircle2 size={40} className="text-[#00A36C] opacity-50" />
                  <p className="text-slate-600 text-sm font-bold">
                    {language === 'ar' ? 'لا توجد بلاغات مطابقة' : 'No matching alerts found'}
                  </p>
                </div>
              ) : (
                filteredIncidents.map(incident => {
                  const cfg = getSeverityConfig(incident.severity);
                  return (
                    <div
                      key={incident.id}
                      className={`p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center gap-4 ${incident.status !== 'resolved' && incident.severity === 'critical' ? 'border-r-2 border-[#DC2626]' : ''}`}
                    >
                      {/* Left: info */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-mono ${cfg.textClass} font-bold`}>{incident.id}</span>
                          <span className="flex items-center gap-1 text-[10px] text-slate-500 font-bold">
                            <Clock size={11} />{incident.time}
                          </span>
                          <span className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase ${cfg.badgeClass}`}>
                            {language === 'ar' ? cfg.labelAr : cfg.labelEn}
                          </span>
                          {incident.status === 'resolved' && (
                            <span className="px-2 py-0.5 rounded border text-[8px] font-black uppercase text-[#00A36C] bg-[#006C35] border-[#006C35]">
                              {language === 'ar' ? 'تمت المعالجة' : 'Resolved'}
                            </span>
                          )}
                        </div>

                        <h4 className="text-[13px] font-black text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ backgroundColor: cfg.dot }} />
                          {language === 'ar' ? incident.typeAr : incident.typeEn}
                        </h4>

                        <div className="flex flex-wrap gap-4 text-[11px] font-bold text-slate-600">
                          <span className="flex items-center gap-1.5">
                            <UserCheck size={12} className="text-slate-500" />
                            {language === 'ar' ? incident.pilgrimNameAr : incident.pilgrimNameEn}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-slate-500" />
                            {language === 'ar' ? incident.locationAr : incident.locationEn}
                          </span>
                        </div>
                      </div>

                      {/* Right: actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button className="p-2 rounded-lg bg-white hover:bg-slate-700 text-slate-600 hover:text-slate-900 transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 rounded-lg bg-white hover:bg-slate-700 text-slate-600 hover:text-slate-900 transition-colors">
                          <MoreHorizontal size={14} />
                        </button>
                        {incident.status !== 'resolved' ? (
                          <button
                            onClick={() => {
                              resolveIncident(incident.id);
                              addToast(
                                language === 'ar' ? `✅ تمت معالجة البلاغ ${incident.id}` : `✅ Incident ${incident.id} resolved`,
                                'success'
                              );
                            }}
                            className="px-4 py-2 rounded-xl bg-[#006C35] hover:bg-[#006C35] text-slate-900 font-black text-[10px] tracking-wide uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <ShieldCheck size={12} />
                            <span>{language === 'ar' ? 'معالجة فورية' : 'Resolve'}</span>
                          </button>
                        ) : (
                          <div className="px-4 py-2 rounded-xl border border-[#006C35] bg-[#006C35]/5 text-[#00A36C] font-black text-[10px] flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            <span>{language === 'ar' ? 'مُعالجة' : 'Done'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Activity Logs */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-[13px] font-black text-slate-900">
                {language === 'ar' ? 'سجل النشاط التشغيلي' : 'Operational Activity Log'}
              </h3>
            </div>
            <div className="divide-y divide-slate-700">
              {recentLogs.map((log, idx) => (
                <div key={idx} className="p-3.5 flex items-center gap-3 hover:bg-white transition-colors">
                  <span className="text-[10px] font-mono text-slate-500 w-12 flex-shrink-0">{log.timeStr}</span>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${log.type === 'danger' ? 'bg-[#1E5AA8]' : log.type === 'warning' ? 'bg-[#2980B9]' : 'bg-[#006C35]'}`} />
                  <p className="text-[11px] font-bold text-slate-800 flex-1">
                    {language === 'ar' ? log.msgAr : log.msgEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM PANELS: Teams + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

          {/* Emergency Status Summary */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <h3 className="text-sm font-black text-slate-900 mb-4">
              {language === 'ar' ? 'ملخص الحالة الطارئة' : 'Emergency Status Summary'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="text-[11px] font-bold text-slate-600">{language === 'ar' ? 'بلاغات معلقة' : 'Pending Alerts'}</span>
                <span className="font-black text-[#1E5AA8] text-sm">{pendingCount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="text-[11px] font-bold text-slate-600">{language === 'ar' ? 'تمت المعالجة' : 'Resolved'}</span>
                <span className="font-black text-[#00A36C] text-sm">{resolvedCount}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="text-[11px] font-bold text-slate-600">{language === 'ar' ? 'فرق الاستجابة الجاهزة' : 'Ready Teams'}</span>
                <span className="font-black text-[#1E5AA8] text-sm">3</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[11px] font-bold text-slate-600">{language === 'ar' ? 'متوسط وقت الاستجابة' : 'Avg. Response Time'}</span>
                <span className="font-black text-slate-900 text-sm">83s</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <h3 className="text-sm font-black text-slate-900 mb-4">
              {language === 'ar' ? 'الإجراءات الفورية' : 'Quick Actions'}
            </h3>
            <div className="space-y-3">
              <button
                className="w-full py-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-[#1E5AA8] font-black text-[12px] transition-colors flex items-center justify-center gap-2"
                onClick={() => addToast(language === 'ar' ? '🚨 تم تفعيل خطة الطوارئ القصوى!' : '🚨 Maximum emergency plan activated!', 'danger')}
              >
                <Siren size={16} />
                {language === 'ar' ? 'تفعيل خطة الطوارئ الكاملة' : 'Activate Full Emergency Plan'}
              </button>
              <button
                className="w-full py-3 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-[#2980B9] font-black text-[12px] transition-colors flex items-center justify-center gap-2"
                onClick={() => addToast(language === 'ar' ? '📡 تم إرسال إشارة استدعاء لجميع الفرق' : '📡 All teams paged successfully', 'info')}
              >
                <Radio size={16} />
                {language === 'ar' ? 'استدعاء جميع الفرق الميدانية' : 'Page All Field Teams'}
              </button>
              <button
                className="w-full py-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-[#006C35] font-black text-[12px] transition-colors flex items-center justify-center gap-2"
                onClick={() => addToast(language === 'ar' ? '✅ تم رفع البلاغ لمركز القيادة العليا' : '✅ Report escalated to HQ', 'success')}
              >
                <PhoneCall size={16} />
                {language === 'ar' ? 'إرسال تقرير لمركز القيادة' : 'Escalate to Command HQ'}
              </button>
            </div>
          </div>

          {/* Rescue Teams Panel */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white flex-1">
            <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
              <Users size={16} className="text-[#1E5AA8]" />
              {language === 'ar' ? 'فرق الاستجابة الميدانية' : 'Field Response Teams'}
            </h3>
            <div className="space-y-3">
              {rescueTeams.map((team, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: team.dot }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-slate-900 truncate">{language === 'ar' ? team.nameAr : team.nameEn}</p>
                    <p className={`text-[10px] font-bold ${team.color}`}>{language === 'ar' ? team.statusAr : team.statusEn}</p>
                  </div>
                  <button className="p-1 rounded text-slate-500 hover:text-[#1E5AA8] transition-colors">
                    <PhoneCall size={13} />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[9px] text-slate-500 mt-4 leading-relaxed border-t border-slate-200 pt-3">
              💡 {language === 'ar'
                ? 'تتوزع فرق التدخل بالقرب من مناطق الازدحام لضمان وقت استجابة يقل عن 90 ثانية.'
                : 'Teams are strategically stationed near critical zones for sub-90s response time.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

