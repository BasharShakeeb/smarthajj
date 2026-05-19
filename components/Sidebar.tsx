"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Route,
  Bell,
  Radio,
  UserCheck,
  FileBarChart2,
  Settings,
  Languages,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CircleDot,
  X
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar, language, setLanguage, theme, setTheme, incidents } = useStore();
  const t = translations[language];
  const [isLogoModalOpen, setIsLogoModalOpen] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard,       href: '/overview' },
    { icon: Users,           label: t.crowdManagement, href: '/crowd-management' },
    { icon: Route,           label: t.routes,          href: '/routes' },
    { icon: Bell,            label: t.alerts,          href: '/alerts', badge: incidents.filter(i => i.status === 'pending').length },
    { icon: Radio,           label: t.bracelets,       href: '/bracelets' },
    { icon: UserCheck,       label: t.pilgrims,        href: '/pilgrims' },
    { icon: FileBarChart2,   label: t.reports,         href: '/reports' },
    { icon: Settings,        label: t.settings,        href: '/settings' },
  ];

  return (
    <>
      <aside
      className={`
        fixed top-0 bottom-0 h-screen bg-[#0F2440]/95 backdrop-blur-md border-[#1B3A5C] transition-all duration-300 z-50
        shadow-[0_0_30px_rgba(30,90,168,0.08)] border-r flex flex-col justify-between
        ${language === 'ar' ? 'right-0' : 'left-0'}
        ${isSidebarOpen ? 'w-72' : 'w-20'}
      `}
    >
      <div className="flex flex-col h-full overflow-hidden">
        
        {/* Top Branding */}
        <div className="p-5 border-b border-[#1B3A5C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsLogoModalOpen(true)} 
              className="cursor-zoom-in transition-transform hover:scale-105 active:scale-95 duration-200 focus:outline-none flex-shrink-0" 
              title={language === 'ar' ? 'تكبير الشعار' : 'Zoom Logo'}
            >
              <img src="/sayer.PNG" alt="Sayer Logo" className="w-10 h-10 object-contain rounded-xl shadow-sm" />
            </button>
            {isSidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00A36C] to-[#1E5AA8]">
                  {t.appName.toUpperCase()}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider">
                  {t.subTitle}
                </span>
              </div>
            )}
          </div>
          {isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg border border-[#1B3A5C] text-slate-400 hover:text-[#00A36C] hover:border-[#006C35]/40 transition-all"
            >
              {language === 'ar' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        {/* Collapse toggle when closed */}
        {!isSidebarOpen && (
          <div className="py-4 border-b border-[#1B3A5C] flex flex-col items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl border border-[#1B3A5C] text-[#1E5AA8] hover:text-[#00A36C] hover:border-[#006C35]/40 transition-all"
              title="Expand menu"
            >
              {language === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (pathname === '/' && item.href === '/overview');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-[#006C35]/10 border border-[#006C35]/30 text-[#00A36C] shadow-[0_0_12px_rgba(0,108,53,0.08)]'
                    : 'text-slate-400 hover:bg-[#1B3A5C]/30 hover:text-white border border-transparent'
                  }
                `}
              >
                {isActive && (
                  <div className={`absolute top-2 bottom-2 w-1 rounded-full bg-[#006C35] ${language === 'ar' ? 'right-0' : 'left-0'}`} />
                )}

                <item.icon
                  size={20}
                  className={`flex-shrink-0 transition-all duration-200 ${isActive ? 'text-[#00A36C]' : 'group-hover:text-[#1E5AA8]'}`}
                />
                
                {isSidebarOpen && (
                  <span className="font-semibold text-xs tracking-wide flex-1 truncate">{item.label}</span>
                )}

                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`
                    flex items-center justify-center text-[10px] font-black w-5 h-5 rounded-full bg-[#1E5AA8] text-white animate-pulse
                    ${isSidebarOpen ? '' : 'absolute top-1 right-2'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#1B3A5C] space-y-4 bg-[#0A1628]/60">
          
          {isSidebarOpen ? (
            <div className="flex gap-2 justify-between">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg border border-[#1B3A5C] hover:border-[#1E5AA8]/50 text-slate-300 hover:text-[#1E5AA8] text-[10px] font-black transition-all"
              >
                <Languages size={14} />
                <span>{language === 'ar' ? 'ENGLISH' : 'العربية'}</span>
              </button>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-center w-10 p-2 rounded-lg border border-[#1B3A5C] hover:border-[#006C35]/40 text-slate-300 hover:text-[#00A36C] transition-all"
              >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="p-2 rounded-lg border border-[#1B3A5C] text-slate-400 hover:text-[#1E5AA8]"
                title={language === 'ar' ? 'ENGLISH' : 'العربية'}
              >
                <Languages size={16} />
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg border border-[#1B3A5C] text-slate-400 hover:text-[#00A36C]"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          )}

          {/* Admin Badge */}
          <div className={`flex items-center gap-3 p-2.5 rounded-xl border border-[#1B3A5C] bg-[#0A1628] ${isSidebarOpen ? '' : 'justify-center'}`}>
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#006C35] to-[#1E5AA8] flex items-center justify-center text-white text-xs font-black ring-2 ring-[#00A36C] shadow-[0_0_10px_rgba(0,108,53,0.2)]">
                ADM
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00A36C] ring-2 ring-[#0A1628] animate-pulse" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">{t.adminRole}</span>
                <span className="text-[9px] font-semibold text-[#00A36C] flex items-center gap-1">
                  <CircleDot size={8} className="animate-pulse" />
                  {t.adminStatus}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>

    {isLogoModalOpen && (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050B14]/85 backdrop-blur-lg transition-all duration-300 p-4"
        onClick={() => setIsLogoModalOpen(false)}
      >
        <div 
          className="relative max-w-lg w-full bg-[#0F2440]/90 border border-[#1B3A5C] p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsLogoModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full border border-[#1B3A5C] text-slate-400 hover:text-[#EF4444] hover:border-[#EF4444]/40 transition-all bg-[#0A1628]"
            title={language === 'ar' ? 'إغلاق' : 'Close'}
          >
            <X size={18} />
          </button>

          {/* Title / Header */}
          <div className="text-center mt-2">
            <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00A36C] to-[#1E5AA8] tracking-wide">
              {t.appName}
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-semibold">
              {t.subTitle}
            </p>
          </div>

          {/* Enlarged Image Preview */}
          <div className="relative w-full aspect-[1/1.4] max-h-[70vh] bg-white/5 rounded-2xl border border-white/10 p-4 flex items-center justify-center overflow-hidden shadow-inner">
            <img 
              src="/sayer.PNG" 
              alt="Sayer Full Logo" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase">
            SAYER OPERATIONAL DASHBOARD
          </p>
        </div>
      </div>
    )}
  </>
  );
};
