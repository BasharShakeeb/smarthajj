"use client";

import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Sidebar } from "@/components/Sidebar";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { Menu, ShieldCheck, CheckCircle, Info, AlertTriangle, AlertCircle, X } from "lucide-react";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { language, isSidebarOpen, toggleSidebar, theme, setTheme, toasts, removeToast } = useStore();
  const [mounted, setMounted] = useState(false);

  // Sync theme with localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }
    setMounted(true);
  }, [setTheme]);

  // Apply properties to HTML element
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Automatically close sidebar by default on small screens (< 1024px)
  useEffect(() => {
    const checkViewport = () => {
      if (window.innerWidth < 1024 && isSidebarOpen) {
        toggleSidebar();
      }
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} className={theme}>
      <head>
        <title>Smart Hajj — Control Dashboard</title>
        <meta name="description" content="Smart Hajj operational control dashboard — Vision 2030" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen transition-colors duration-300`}>
        
        {/* Toast Portal Container */}
        <div className={`fixed top-4 z-50 flex flex-col gap-2 max-w-sm w-[90%] ${language === 'ar' ? 'left-4' : 'right-4'}`}>
          {toasts.map((toast) => {
            let bgClass = 'bg-card text-foreground border-border';
            let icon = <Info className="text-info" size={18} />;

            if (toast.type === 'success') {
              bgClass = 'bg-success/10 text-success border-success/20';
              icon = <CheckCircle className="text-success" size={18} />;
            } else if (toast.type === 'warning') {
              bgClass = 'bg-warning/10 text-warning border-warning/20';
              icon = <AlertTriangle className="text-warning" size={18} />;
            } else if (toast.type === 'danger') {
              bgClass = 'bg-danger/10 text-danger border-danger/20';
              icon = <AlertCircle className="text-danger" size={18} />;
            }

            return (
              <div
                key={toast.id}
                className={`
                  flex items-center gap-3 p-3.5 rounded-2xl border glass shadow-[0_8px_32px_rgba(0,0,0,0.12)]
                  transition-all duration-300 animate-slide-in ${bgClass}
                `}
              >
                {icon}
                <p className="text-xs font-semibold flex-1 leading-snug">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-muted-foreground hover:text-foreground p-0.5 rounded-lg hover:bg-muted"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row min-h-screen">
          
          {/* Mobile Top Navbar (Visible only below lg) */}
          <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border sticky top-0 z-40">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-primary/8 text-muted-foreground hover:text-primary transition-colors"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-base text-foreground tracking-tight flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              {language === 'ar' ? 'سمارت حج' : 'Smart Hajj'}
            </span>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shadow-primary-sm">
              SH
            </div>
          </header>

          {/* Sidebar Backdrop Overlay on Mobile */}
          {isSidebarOpen && (
            <div
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
            />
          )}

          <Sidebar />

          <main
            className={`flex-1 transition-all duration-300 p-4 md:p-8 ${
              language === 'ar'
                ? (isSidebarOpen ? 'lg:mr-64' : 'lg:mr-0')
                : (isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0')
            }`}
          >
            <div className="max-w-[1400px] mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
