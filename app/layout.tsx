"use client";

import "../styles/globals.css";
import { Sidebar } from "@/components/Sidebar";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { CheckCircle, Info, AlertTriangle, AlertCircle, X, ShieldAlert } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { language, isSidebarOpen, theme, setTheme, toasts, removeToast, tickSimulation } = useStore();
  const [mounted, setMounted] = useState(false);

  // Sync theme with localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark'); // Default to ultra dark mode
    }
    setMounted(true);
  }, [setTheme]);

  // Set HTML attributes for RTL/LTR
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Apply theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Live real-time simulation interval!
  useEffect(() => {
    const interval = setInterval(() => {
      tickSimulation();
    }, 3000);
    return () => clearInterval(interval);
  }, [tickSimulation]);

  if (!mounted) {
    return (
      <html lang="ar" dir="rtl" className="dark">
        <body className="bg-white min-h-screen text-slate-900 flex items-center justify-center font-sans">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-t-2 border-[#006C35] border-r-2 border-[#1E5AA8] animate-spin" />
            <p className="text-sm font-semibold tracking-wider text-slate-600">LOADING SAYER SYSTEM...</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} className={theme}>
      <head>
        <title>منظومة سيّر — Sayer Smart Hajj Bracelet System</title>
        <meta name="description" content="Sayer Hajj Operational Dashboard — Saudi Vision 2030" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen transition-colors duration-300 overflow-x-hidden font-sans">
        
        {/* Futuristic Toast Notifications Portal */}
        <div className={`fixed top-6 z-50 flex flex-col gap-3 max-w-md w-[90%] ${language === 'ar' ? 'left-6' : 'right-6'}`}>
          {toasts.map((toast) => {
            let bgClass = 'bg-white border-[#1B3A5C] text-slate-900';
            let icon = <Info className="text-[#1E5AA8]" size={20} />;

            if (toast.type === 'success') {
              bgClass = 'bg-white text-slate-900 border-[#006C35] shadow-[0_0_12px_rgba(0,108,53,0.12)]';
              icon = <CheckCircle className="text-[#00A36C]" size={20} />;
            } else if (toast.type === 'warning') {
              bgClass = 'bg-white text-slate-900 border-[#1E5AA8] shadow-[0_0_12px_rgba(30,90,168,0.12)]';
              icon = <AlertTriangle className="text-[#1E5AA8]" size={20} />;
            } else if (toast.type === 'danger') {
              bgClass = 'bg-white text-slate-900 border-[#1E5AA8] shadow-[0_0_15px_rgba(30,90,168,0.15)]';
              icon = <ShieldAlert className="text-[#1E5AA8] animate-pulse" size={20} />;
            }

            return (
              <div
                key={toast.id}
                className={`
                  flex items-center gap-4 p-4 rounded-xl border glass shadow-2xl
                  transition-all duration-300 animate-slide-in ${bgClass}
                `}
              >
                {icon}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold leading-normal">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-slate-600 hover:text-slate-900 p-1 rounded-lg hover:bg-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Global Dashboard Shell */}
        <div className="flex flex-col lg:flex-row min-h-screen relative">
          
          <Sidebar />

          {/* Main Content Area */}
          <main
            className={`flex-1 transition-all duration-300 p-4 md:p-6 w-full ${
              isSidebarOpen 
                ? (language === 'ar' ? 'lg:mr-72' : 'lg:ml-72') 
                : (language === 'ar' ? 'lg:mr-20' : 'lg:ml-20')
            }`}
          >
            <div className="max-w-[1700px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
