"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Flame,
  Bell,
  Settings,
  Activity,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Languages,
  Sun,
  Moon
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar, language, setLanguage, theme, setTheme } = useStore();
  const t = translations[language];

  const menuItems = [
    { icon: LayoutDashboard, label: t.overview,  href: '/overview' },
    { icon: Flame,           label: t.heatmaps,  href: '/heatmaps' },
    { icon: Bell,            label: t.alerts,    href: '/alerts'   },
    { icon: Activity,        label: t.control,   href: '/control'  },
    { icon: Smartphone,      label: t.mobile,    href: '/mobile'   },
    { icon: Settings,        label: t.settings,  href: '/settings' },
  ];

  return (
    <aside
      className={`
        fixed top-0 h-screen bg-card border-border transition-all duration-300 z-50
        shadow-[2px_0_24px_rgba(0,87,168,0.08)]
        ${language === 'ar' ? 'right-0 border-l border-r-0' : 'left-0 border-r border-l-0'}
        
        /* Desktop */
        lg:translate-x-0
        ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 lg:w-20'}
        
        /* Mobile Drawer Slide */
        ${!isSidebarOpen
          ? (language === 'ar' ? 'translate-x-full w-64 lg:translate-x-0' : '-translate-x-full w-64 lg:translate-x-0')
          : 'translate-x-0 w-64'
        }
      `}
    >
      <div className="flex flex-col h-full">

        {/* ── Logo & Toggle Header ── */}
        <div className={`p-5 flex items-center border-b border-border ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
          <div className="flex items-center gap-3">
            <button
              onClick={!isSidebarOpen ? toggleSidebar : undefined}
              className={`w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-primary-sm flex-shrink-0 group ${!isSidebarOpen ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
              title={!isSidebarOpen ? (language === 'ar' ? 'توسيع الشريط الجانبي' : 'Expand Sidebar') : undefined}
              disabled={isSidebarOpen}
            >
              {!isSidebarOpen ? (
                language === 'ar' ? <ChevronLeft size={18} className="text-white group-hover:-translate-x-0.5 transition-transform" /> : <ChevronRight size={18} className="text-white group-hover:translate-x-0.5 transition-transform" />
              ) : (
                <ShieldCheck size={20} className="text-white" />
              )}
            </button>
            {isSidebarOpen && (
              <div>
                <span className="font-bold text-base tracking-tight leading-none text-foreground">
                  {t.appName}
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
                </p>
              </div>
            )}
          </div>
          
          {/* Collapse Toggle Button (At Top when open) */}
          {isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-primary/8 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center"
              title={language === 'ar' ? 'تصغير الشريط الجانبي' : 'Collapse Sidebar'}
            >
              {language === 'ar' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}
        </div>

        {/* ── Language Toggle (At Top) ── */}
        <div className="px-3 py-2.5 border-b border-border flex justify-center">
          {!isSidebarOpen ? (
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="p-2.5 rounded-xl hover:bg-primary/8 text-muted-foreground hover:text-primary transition-all duration-200 group"
              title={language === 'ar' ? 'Switch to English' : 'تغيير إلى العربية'}
            >
              <Languages
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          ) : (
            <div className="w-full flex items-center gap-2 px-1" style={{ direction: 'ltr' }}>
              <Languages size={18} className="text-muted-foreground flex-shrink-0" />
              <div className="relative flex-1 h-8 bg-muted border border-border rounded-xl p-0.5 flex items-center cursor-pointer select-none">
                {/* Background click toggle */}
                <div
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="absolute inset-0 z-0"
                />
                
                {/* Sliding Pill */}
                <div
                  className={`
                    absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-lg
                    gradient-primary shadow-primary-sm transition-transform duration-300 ease-out z-10
                    ${language === 'ar' ? 'translate-x-full' : 'translate-x-0'}
                  `}
                />
                
                {/* EN Tab */}
                <button
                  onClick={() => setLanguage('en')}
                  className={`
                    flex-1 text-center text-xs font-bold transition-all duration-300 z-20 relative
                    ${language === 'en' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}
                  `}
                >
                  EN
                </button>

                {/* AR Tab */}
                <button
                  onClick={() => setLanguage('ar')}
                  className={`
                    flex-1 text-center text-xs font-bold transition-all duration-300 z-20 relative
                    ${language === 'ar' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}
                  `}
                >
                  العربية
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200 group relative
                  ${isActive
                    ? 'gradient-primary text-white shadow-primary-sm'
                    : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground'
                  }
                `}
              >
                <item.icon
                  size={20}
                  className={`flex-shrink-0 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`}
                />
                {isSidebarOpen && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
                {isActive && isSidebarOpen && (
                  <div className={`${language === 'ar' ? 'mr-auto' : 'ml-auto'} w-1.5 h-1.5 bg-white rounded-full opacity-70`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Theme Switcher (At Bottom) ── */}
        <div className="p-4 border-t border-border mt-auto">
          {!isSidebarOpen ? (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 mx-auto rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200"
              title={theme === 'dark' ? (language === 'ar' ? 'تفعيل الوضع النهاري' : 'Switch to Light Mode') : (language === 'ar' ? 'تفعيل الوضع الليلي' : 'Switch to Dark Mode')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          ) : (
            <div className="w-full bg-muted border border-border rounded-xl p-1 flex items-center relative h-10 select-none" style={{ direction: 'ltr' }}>
              {/* Background sliding indicator */}
              <div
                className={`
                  absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-lg
                  gradient-primary shadow-primary-sm transition-transform duration-300 ease-out z-10
                  ${theme === 'dark' ? 'translate-x-full' : 'translate-x-0'}
                `}
              />
              {/* Light tab */}
              <button
                onClick={() => setTheme('light')}
                className={`
                  flex-1 flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-300 z-20 relative h-full
                  ${theme === 'light' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                <Sun size={14} />
                <span>{language === 'ar' ? 'نهاري' : 'Light'}</span>
              </button>
              {/* Dark tab */}
              <button
                onClick={() => setTheme('dark')}
                className={`
                  flex-1 flex items-center justify-center gap-1.5 text-xs font-bold transition-all duration-300 z-20 relative h-full
                  ${theme === 'dark' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                <Moon size={14} />
                <span>{language === 'ar' ? 'ليلي' : 'Dark'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
