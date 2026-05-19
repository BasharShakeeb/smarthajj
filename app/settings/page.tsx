"use client";

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Languages, 
  Database, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

export default function SettingsPage() {
  const { language, setLanguage, theme, setTheme } = useStore();
  const t = translations[language];

  // Operator profile fields state
  const [operatorName, setOperatorName] = useState(language === 'ar' ? 'أحمد الفارسي' : 'Ahmad Al-Farsi');
  const [operatorId, setOperatorId] = useState('OP-14479');
  const [operatorEmail, setOperatorEmail] = useState('a.subaie@hajj.gov.sa');

  // Operational toggles
  const [pushSound, setPushSound] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    useStore.getState().addToast(
      language === 'ar'
        ? '💾 تم بنجاح حفظ وتطبيق جميع الإعدادات والمتغيرات التشغيلية!'
        : '💾 All operational settings and parameters applied successfully!',
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-slide-up">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl glass border border-slate-200 bg-white">
        <div>
          <span className="text-[10px] font-black text-[#00A36C] tracking-wider block uppercase">SYSTEM PREFERENCES COCKPIT</span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{t.systemSettings}</h1>
          <p className="text-xs text-slate-600 font-semibold">{language === 'ar' ? 'تهيئة لوحة التحكم والتفضيلات التشغيلية.' : 'Configure your cockpit and operational preferences.'}</p>
        </div>
      </header>

      {/* Main Form layout */}
      <form onSubmit={handleSaveSettings} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left main forms (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Profile & Credentials */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
            <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase flex items-center gap-2">
              <User size={16} className="text-[#1E5AA8]" />
              <span>{language === 'ar' ? 'معلومات الحساب' : 'Account Information'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-600 uppercase block">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                <input 
                  type="text" 
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:border-[#1E5AA8]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-600 uppercase block">{language === 'ar' ? 'معرف الضابط' : 'Officer ID'}</label>
                <input 
                  type="text" 
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold focus:border-[#1E5AA8]"
                  required
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-black text-slate-600 uppercase block">{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input 
                  type="email" 
                  value={operatorEmail}
                  onChange={(e) => setOperatorEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:border-[#1E5AA8]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Notifications & Sound */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
            <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase flex items-center gap-2">
              <Bell size={16} className="text-[#1E5AA8]" />
              <span>{t.notificationsSettings}</span>
            </h3>

            <div className="space-y-3 text-xs font-semibold text-slate-800">
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-slate-200 transition-colors">
                <input 
                  type="checkbox" 
                  checked={pushSound}
                  onChange={(e) => setPushSound(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-200 text-cyan-500 bg-white focus:ring-cyan-500 focus:ring-offset-slate-900"
                />
                <div>
                  <span className="block text-slate-900">{language === 'ar' ? 'تشغيل منبهات صوتية طارئة' : 'Emergency alarm alert sounds'}</span>
                  <span className="text-[9px] text-slate-500 block font-normal mt-0.5">{language === 'ar' ? 'تشغيل صوت صفارة الإنذار عند ورود بلاغات SOS جديدة.' : 'Play alert siren sounds immediately when new distress packets arrive.'}</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-slate-200 transition-colors">
                <input 
                  type="checkbox" 
                  checked={aiAnalysis}
                  onChange={(e) => setAiAnalysis(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-200 text-cyan-500 bg-white focus:ring-cyan-500 focus:ring-offset-slate-900"
                />
                <div>
                  <span className="block text-slate-900">{language === 'ar' ? 'تفعيل محرك تشخيصات الذكاء الاصطناعي' : 'Enable AI predictive diagnostic models'}</span>
                  <span className="text-[9px] text-slate-500 block font-normal mt-0.5">{language === 'ar' ? 'حساب التدفقات والاحتماليات المستقبلية تلقائياً في الخلفية.' : 'Run real-time crowd occupancy forecasts in the background.'}</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right side controls (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick saves & lang switcher */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between h-[230px]">
            <div>
              <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase mb-4 flex items-center gap-2">
                <Languages size={16} className="text-[#1E5AA8]" />
                <span>{t.languagesSettings}</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('ar')}
                  className={`py-3 rounded-xl border text-xs font-black tracking-wider transition-all cursor-pointer ${language === 'ar' ? 'border-[#006C35] bg-[#006C35] text-[#00A36C] font-black shadow-[0_0_10px_rgba(16,185,129,0.15)]' : 'border-slate-200 text-slate-600 hover:text-slate-900'}`}
                >
                  العربية
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`py-3 rounded-xl border text-xs font-black tracking-wider transition-all cursor-pointer ${language === 'en' ? 'border-[#006C35] bg-[#006C35] text-[#00A36C] font-black shadow-[0_0_10px_rgba(16,185,129,0.15)]' : 'border-slate-200 text-slate-600 hover:text-slate-900'}`}
                >
                  ENGLISH
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#006C35] to-[#1E5AA8] text-slate-950 font-black text-xs tracking-wider uppercase hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,136,0.15)]"
            >
              <Save size={14} />
              <span>{t.saveBtn}</span>
            </button>
          </div>

          {/* Security details role */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
            <h3 className="text-xs font-black tracking-widest text-slate-600 uppercase flex items-center gap-2">
              <Shield size={16} className="text-[#1E5AA8]" />
              <span>{t.rolesTitle}</span>
            </h3>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-800 space-y-1 relative">
              <span className="w-1.5 h-6 rounded-full bg-[#00A36C] absolute left-0 top-1/2 -translate-y-1/2" />
              <p>{language === 'ar' ? 'الدور الحالي: مشرف عام مع صلاحية تشغيل كاملة' : 'Current clearance: General Administrator (Super Operator)'}</p>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}

