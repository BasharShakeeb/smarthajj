"use client";

import React from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Smartphone, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function MobilePage() {
  const { language, addToast } = useStore();

  const labels = {
    ar: {
      title: 'رفيق الحج الذكي',
      desc: 'التطبيق التشغيلي الموحد للحجاج والضباط الميدانيين.',
      pilgrimStatus: 'حالة تطبيق الحاج',
      officerStatus: 'حالة تطبيق الضابط الميداني',
      pilgrimDetails: ['إصدار v4.2.1 مستقر وآمن', '1.2 مليون تثبيت نشط ومفعل', 'أقمار صناعية وطوارئ SOS نشطة'],
      officerDetails: ['تحديث أمني مشفر v2.0.5', '15 ألف ضابط وجندي نشط', 'تتبع المواقع الحي GPS مفعل'],
      analytics: 'عرض تحليلات وتفاعل الحجاج',
      manage: 'إدارة تصاريح الوصول الميداني',
      available: 'متوفر للتحميل المباشر للضباط والحجاج',
      ios: 'تحميل تطبيق iOS للضباط',
      android: 'تحميل تطبيق Android للضباط',
    },
    en: {
      title: 'Smart Hajj Companion',
      desc: 'The essential mobile ecosystem for pilgrims and field officers.',
      pilgrimStatus: 'Pilgrim App Status',
      officerStatus: 'Officer App Status',
      pilgrimDetails: ['v4.2.1 Stable & Secured', '1.2M Active Installs', 'Emergency Satellite SOS Active'],
      officerDetails: ['v2.0.5 Encryption Patch', '15k Active Officers', 'Real-time GPS Tracking enabled'],
      analytics: 'View Pilgrim Analytics',
      manage: 'Manage Field Access',
      available: 'Available for secure government download',
      ios: 'iOS Officer App',
      android: 'Android Officer App',
    },
  };

  const l = labels[language];

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-12 text-center animate-slide-in">

      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center shadow-primary-md hover:scale-105 transition-transform duration-300">
          <Smartphone size={40} className="text-white" />
        </div>
      </div>

      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{l.title}</h1>
        <p className="text-lg text-muted-foreground mt-4">{l.desc}</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right mt-8" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>

        {/* Pilgrim App */}
        <Card className="hover:shadow-primary-sm transition-all duration-300">
          <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${language === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <CheckCircle2 className="text-primary" size={20} />
            {l.pilgrimStatus}
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {l.pilgrimDetails.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
          <Button
            className="w-full mt-6 hover:scale-[1.01] transition-transform"
            variant="outline"
            onClick={() => addToast(language === 'ar' ? 'جاري مزامنة وتحميل بيانات لوحة معلومات الحجاج...' : 'Loading real-time pilgrim analytics telemetry...', 'info')}
          >
            {l.analytics}
          </Button>
        </Card>

        {/* Officer App */}
        <Card className="hover:shadow-primary-sm transition-all duration-300">
          <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${language === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
            <ShieldCheck className="text-secondary" size={20} />
            {l.officerStatus}
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {l.officerDetails.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
          <Button
            className="w-full mt-6 hover:scale-[1.01] transition-transform"
            onClick={() => addToast(language === 'ar' ? 'تم فتح منفذ تصاريح دخول الضباط الميدانيين.' : 'Opened field access control panel.', 'success')}
          >
            {l.manage}
          </Button>
        </Card>
      </div>

      {/* Download Links */}
      <div className="pt-8">
        <p className="text-sm text-muted-foreground mb-4">{l.available}</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Button
            variant="secondary"
            size="lg"
            className="hover:scale-102 transition-transform duration-200"
            onClick={() => addToast(language === 'ar' ? 'جاري بدء تحميل تطبيق iOS للضباط...' : 'Starting secure iOS app packet download...', 'success')}
          >
            <Download className="mr-2" size={18} /> {l.ios}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hover:scale-102 transition-transform duration-200"
            onClick={() => addToast(language === 'ar' ? 'جاري التحميل تطبيق Android للضباط...' : 'Starting secure Android APK download...', 'success')}
          >
            <Download className="mr-2" size={18} /> {l.android}
          </Button>
        </div>
      </div>
    </div>
  );
}
