"use client";

import React from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { User, Bell, Shield, Database, Globe } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export default function SettingsPage() {
  const { language, theme, setTheme, addToast } = useStore();
  const t = translations[language];

  const menuItems = [
    { icon: User,     label: t.profile,      active: true  },
    { icon: Bell,     label: t.notifications,active: false },
    { icon: Shield,   label: t.security,     active: false },
    { icon: Database, label: t.dataSources,  active: false },
    { icon: Globe,    label: t.regional,     active: false },
  ];

  return (
    <div className="space-y-8" key={language}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.settingsTitle}</h1>
        <p className="text-muted-foreground mt-1">{t.settingsDesc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left Nav */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? 'gradient-primary text-white shadow-primary-sm'
                  : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground border border-transparent hover:border-border'
              } ${language === 'ar' ? 'text-right' : 'text-left'}`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 space-y-6">

          <Card title={t.accountInfo}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.fullName}</label>
                  <input
                    type="text"
                    className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm"
                    defaultValue={t.officerNameVal}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.officerId}</label>
                  <input
                    type="text"
                    className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm opacity-60 cursor-not-allowed"
                    defaultValue="SH-2026-001"
                    disabled
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.emailAddress}</label>
                <input
                  type="email"
                  className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm"
                  defaultValue="ahmad.f@smart-hajj.gov.sa"
                />
              </div>
              <Button
                className="mt-2"
                onClick={() => {
                  addToast(
                    language === 'ar' ? 'تم حفظ التغييرات بنجاح!' : 'Changes saved successfully!',
                    'success'
                  );
                }}
              >
                {t.saveChanges}
              </Button>
            </div>
          </Card>

          <Card title={t.appearance}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{t.darkMode}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.darkModeDesc}</p>
              </div>
              {/* Interactive Toggle */}
              <button
                onClick={() => {
                  const nextTheme = theme === 'dark' ? 'light' : 'dark';
                  setTheme(nextTheme);
                  addToast(
                    language === 'ar'
                      ? `تم تفعيل الوضع ${nextTheme === 'dark' ? 'الليلي' : 'النهاري'} بنجاح!`
                      : `Successfully switched to ${nextTheme} mode!`,
                    'success'
                  );
                }}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 focus:outline-none flex items-center ${theme === 'dark' ? 'bg-primary' : 'bg-muted border border-border'}`}
              >
                <div
                  className={`
                    absolute w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300
                    ${theme === 'dark'
                      ? (language === 'ar' ? 'left-1' : 'right-1')
                      : (language === 'ar' ? 'right-1' : 'left-1')
                    }
                  `}
                />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
