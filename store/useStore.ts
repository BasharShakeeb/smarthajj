import { create } from 'zustand';

// Types for our futuristic system
export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger';
}

export interface Pilgrim {
  id: string;
  nameAr: string;
  nameEn: string;
  braceletId: string;
  groupAr: string;
  groupEn: string;
  status: 'safe' | 'warning' | 'danger';
  battery: number;
  locationAr: string;
  locationEn: string;
  lat: number;
  lng: number;
  heartRate: number;
  bloodPressure: string;
}

export interface AlertIncident {
  id: string;
  pilgrimNameAr: string;
  pilgrimNameEn: string;
  locationAr: string;
  locationEn: string;
  time: string;
  status: 'pending' | 'resolving' | 'resolved';
  severity: 'critical' | 'warning' | 'info';
  typeAr: string;
  typeEn: string;
  lat: number;
  lng: number;
}

export interface SmartRoute {
  id: string;
  nameAr: string;
  nameEn: string;
  usagePercent: number;
  status: 'open' | 'crowded' | 'closed';
  etaMinutes: number;
  density: 'low' | 'medium' | 'high';
}

export interface BraceletSensor {
  id: string;
  model: string;
  status: 'online' | 'warning' | 'critical' | 'offline';
  battery: number;
  pilgrimId: string;
  rssi: number; // Signal strength
  glowingColor: 'green' | 'yellow' | 'red';
}

interface AppState {
  // Navigation & Theme
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Toasts
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;

  // Real-time metrics
  totalPilgrims: number;
  activeRoutesCount: number;
  currentCrowdCount: number;
  emergencyCount: number;
  safetyRate: number;
  responseTimeSeconds: number;
  
  // Interactive Simulation Controls
  selectedMobileScreen: number; // 0: Home, 1: Map, 2: SOS, 3: Directions, 4: Group
  setSelectedMobileScreen: (screenIndex: number) => void;
  activeBraceletColor: 'green' | 'yellow' | 'red';
  setActiveBraceletColor: (color: 'green' | 'yellow' | 'red') => void;
  
  // Mock Lists
  pilgrims: Pilgrim[];
  routes: SmartRoute[];
  incidents: AlertIncident[];
  bracelets: BraceletSensor[];

  // Actions
  toggleRouteStatus: (routeId: string) => void;
  resolveIncident: (incidentId: string) => void;
  triggerSOS: (pilgrimId: string) => void;
  addIncident: (incident: Omit<AlertIncident, 'id' | 'time' | 'status'>) => void;
  linkBraceletToPilgrim: (braceletId: string, pilgrimId: string) => void;
  updateBraceletColor: (braceletId: string, color: 'green' | 'yellow' | 'red') => void;
  
  // Simulation Ticker
  tickSimulation: () => void;
}

const initialPilgrims: Pilgrim[] = [
  { id: 'PIL-4521', nameAr: 'أحمد محمد السبيعي', nameEn: 'Ahmed Mohamed Al-Subaie', braceletId: 'BRC-8821', groupAr: 'مجموعة 15 - مكة', groupEn: 'Group 15 - Makkah', status: 'safe', battery: 98, locationAr: 'منى - منطقة 3', locationEn: 'Mina - Zone 3', lat: 21.4138, lng: 39.8262, heartRate: 78, bloodPressure: '120/80' },
  { id: 'PIL-3382', nameAr: 'سليمان خالد العتيبي', nameEn: 'Sulaiman Khalid Al-Otaibi', braceletId: 'BRC-7742', groupAr: 'مجموعة 8 - الرياض', groupEn: 'Group 8 - Riyadh', status: 'warning', battery: 64, locationAr: 'منى - منطقة 4', locationEn: 'Mina - Zone 4', lat: 21.4165, lng: 39.8290, heartRate: 95, bloodPressure: '135/88' },
  { id: 'PIL-9912', nameAr: 'محمد عبد الله الشمري', nameEn: 'Mohamed Abdullah Al-Shammari', braceletId: 'BRC-3301', groupAr: 'مجموعة 22 - الشرقية', groupEn: 'Group 22 - East Coast', status: 'danger', battery: 23, locationAr: 'منى - منطقة 5', locationEn: 'Mina - Zone 5', lat: 21.4201, lng: 39.8322, heartRate: 118, bloodPressure: '150/95' },
  { id: 'PIL-1284', nameAr: 'عبد الرحمن صالح الحربي', nameEn: 'Abdulrahman Saleh Al-Harbi', braceletId: 'BRC-1124', groupAr: 'مجموعة 12 - القصيم', groupEn: 'Group 12 - Qassim', status: 'safe', battery: 92, locationAr: 'منى - منطقة 1', locationEn: 'Mina - Zone 1', lat: 21.4110, lng: 39.8205, heartRate: 72, bloodPressure: '118/75' },
  { id: 'PIL-7721', nameAr: 'يوسف علي القحطاني', nameEn: 'Yousef Ali Al-Qahtani', braceletId: 'BRC-5561', groupAr: 'مجموعة 19 - الجنوب', groupEn: 'Group 19 - South Region', status: 'safe', battery: 85, locationAr: 'منى - منطقة 2', locationEn: 'Mina - Zone 2', lat: 21.4125, lng: 39.8240, heartRate: 80, bloodPressure: '122/81' },
];

const initialRoutes: SmartRoute[] = [
  { id: 'RT-1', nameAr: 'المسار الشمالي', nameEn: 'North Route', usagePercent: 92, status: 'open', etaMinutes: 8, density: 'high' },
  { id: 'RT-2', nameAr: 'المسار الجنوبي', nameEn: 'South Route', usagePercent: 89, status: 'open', etaMinutes: 12, density: 'medium' },
  { id: 'RT-3', nameAr: 'المسار الشرقي', nameEn: 'East Route', usagePercent: 65, status: 'crowded', etaMinutes: 24, density: 'high' },
  { id: 'RT-4', nameAr: 'المسار الغربي', nameEn: 'West Route', usagePercent: 0, status: 'closed', etaMinutes: 99, density: 'low' },
];

const initialIncidents: AlertIncident[] = [
  { id: 'INC-772', pilgrimNameAr: 'محمد عبد الله الشمري', pilgrimNameEn: 'Mohamed Abdullah Al-Shammari', locationAr: 'منى - منطقة 5', locationEn: 'Mina - Zone 5', time: '10:28:15', status: 'pending', severity: 'critical', typeAr: 'استغاثة SOS - تسارع نبضات القلب', typeEn: 'SOS - Heart Rate Spike', lat: 21.4201, lng: 39.8322 },
  { id: 'INC-651', pilgrimNameAr: 'سليمان خالد العتيبي', pilgrimNameEn: 'Sulaiman Khalid Al-Otaibi', locationAr: 'منى - منطقة 4', locationEn: 'Mina - Zone 4', time: '10:25:02', status: 'resolving', severity: 'warning', typeAr: 'خروج عن المسار المحدد', typeEn: 'Route Deviation Alert', lat: 21.4165, lng: 39.8290 },
];

const initialBracelets: BraceletSensor[] = [
  { id: 'BRC-8821', model: 'SmartBand ESP32-v4', status: 'online', battery: 98, pilgrimId: 'PIL-4521', rssi: -62, glowingColor: 'green' },
  { id: 'BRC-7742', model: 'SmartBand ESP32-v4', status: 'warning', battery: 64, pilgrimId: 'PIL-3382', rssi: -78, glowingColor: 'yellow' },
  { id: 'BRC-3301', model: 'SmartBand ESP32-v4', status: 'critical', battery: 23, pilgrimId: 'PIL-9912', rssi: -90, glowingColor: 'red' },
  { id: 'BRC-1124', model: 'SmartBand ESP32-v3', status: 'online', battery: 92, pilgrimId: 'PIL-1284', rssi: -58, glowingColor: 'green' },
  { id: 'BRC-5561', model: 'SmartBand ESP32-v3', status: 'online', battery: 85, pilgrimId: 'PIL-7721', rssi: -65, glowingColor: 'green' },
  { id: 'BRC-9910', model: 'SmartBand ESP32-v4', status: 'offline', battery: 0, pilgrimId: '', rssi: -120, glowingColor: 'green' },
];

export const useStore = create<AppState>((set) => ({
  // Navigation & Theme
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  language: 'ar',
  setLanguage: (lang) => {
    localStorage.setItem('language', lang);
    set({ language: lang });
  },
  theme: 'dark',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },

  // Toasts
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id),
  })),

  // Real-time metric variables matching the exact screenshot values initially
  totalPilgrims: 2951432,
  activeRoutesCount: 128,
  currentCrowdCount: 2345678,
  emergencyCount: 23,
  safetyRate: 98.6,
  responseTimeSeconds: 83, // 01:23 mins

  // Interactive UI Simulator state
  selectedMobileScreen: 0, // Default to home screen
  setSelectedMobileScreen: (screenIndex) => set({ selectedMobileScreen: screenIndex }),
  activeBraceletColor: 'green',
  setActiveBraceletColor: (color) => {
    set({ activeBraceletColor: color });
    
    // Changing bracelet color simulates bracelet mode updates!
    if (color === 'red') {
      // Simulate danger bracelet activation
      set((state) => {
        const newIncident: AlertIncident = {
          id: `INC-${Math.floor(100 + Math.random() * 900)}`,
          pilgrimNameAr: 'أحمد محمد السبيعي',
          pilgrimNameEn: 'Ahmed Mohamed Al-Subaie',
          locationAr: 'منى - منطقة 3',
          locationEn: 'Mina - Zone 3',
          time: new Date().toLocaleTimeString(),
          status: 'pending',
          severity: 'critical',
          typeAr: 'تنبيه طوارئ عاجل - السوار يضيء بالأحمر',
          typeEn: 'Manual Urgent SOS - Red LED Triggered',
          lat: 21.4138,
          lng: 39.8262
        };

        // Update pilgrim status to danger
        const updatedPilgrims = state.pilgrims.map(p => 
          p.id === 'PIL-4521' ? { ...p, status: 'danger' as const } : p
        );

        // Update bracelet record
        const updatedBracelets = state.bracelets.map(b => 
          b.id === 'BRC-8821' ? { ...b, glowingColor: 'red' as const, status: 'critical' as const } : b
        );

        state.addToast(
          state.language === 'ar' 
            ? '🚨 تم تفعيل وميض السوار الأحمر! إرسال نداء استغاثة SOS فوري للمشرف!'
            : '🚨 Red LED Warning activated! Immediate SOS alert transmitted to supervisor!',
          'danger'
        );

        return {
          incidents: [newIncident, ...state.incidents],
          pilgrims: updatedPilgrims,
          bracelets: updatedBracelets,
          emergencyCount: state.emergencyCount + 1,
          selectedMobileScreen: 2 // Automatically open SOS mockup screen!
        };
      });
    } else if (color === 'yellow') {
      // Warning bracelet mode
      set((state) => {
        const updatedPilgrims = state.pilgrims.map(p => 
          p.id === 'PIL-4521' ? { ...p, status: 'warning' as const } : p
        );
        const updatedBracelets = state.bracelets.map(b => 
          b.id === 'BRC-8821' ? { ...b, glowingColor: 'yellow' as const, status: 'warning' as const } : b
        );

        state.addToast(
          state.language === 'ar' 
            ? '⚠️ تم تحديث حالة السوار إلى اللون الأصفر (تنبيه بالازدحام).'
            : '⚠️ Bracelet status updated to Yellow (Congestion warning).',
          'warning'
        );

        return {
          pilgrims: updatedPilgrims,
          bracelets: updatedBracelets,
          selectedMobileScreen: 3 // Open directions/navigation screen
        };
      });
    } else {
      // Normal green mode
      set((state) => {
        const updatedPilgrims = state.pilgrims.map(p => 
          p.id === 'PIL-4521' ? { ...p, status: 'safe' as const } : p
        );
        const updatedBracelets = state.bracelets.map(b => 
          b.id === 'BRC-8821' ? { ...b, glowingColor: 'green' as const, status: 'online' as const } : b
        );

        state.addToast(
          state.language === 'ar' 
            ? '🟢 تم تحديث السوار إلى الأخضر (المسار مفتوح وآمن).'
            : '🟢 Bracelet updated to Green (Open path, Pilgrim is safe).',
          'success'
        );

        return {
          pilgrims: updatedPilgrims,
          bracelets: updatedBracelets,
          selectedMobileScreen: 0 // Return to home
        };
      });
    }
  },

  // Initial Mock Lists
  pilgrims: initialPilgrims,
  routes: initialRoutes,
  incidents: initialIncidents,
  bracelets: initialBracelets,

  // App Actions
  toggleRouteStatus: (routeId) => set((state) => {
    const updatedRoutes = state.routes.map(r => {
      if (r.id === routeId) {
        let newStatus: SmartRoute['status'] = 'open';
        let usage = r.usagePercent;
        if (r.status === 'open') {
          newStatus = 'crowded';
          usage = 78;
        } else if (r.status === 'crowded') {
          newStatus = 'closed';
          usage = 0;
        } else {
          newStatus = 'open';
          usage = 15;
        }
        
        state.addToast(
          state.language === 'ar'
            ? `🔄 تم تغيير حالة ${r.nameAr} إلى: ${newStatus === 'open' ? 'مفتوح' : newStatus === 'crowded' ? 'مزدحم' : 'مغلق'}`
            : `🔄 Status of ${r.nameEn} changed to: ${newStatus.toUpperCase()}`,
          newStatus === 'open' ? 'success' : newStatus === 'crowded' ? 'warning' : 'danger'
        );

        return { ...r, status: newStatus, usagePercent: usage };
      }
      return r;
    });

    const activeRoutes = updatedRoutes.filter(r => r.status === 'open').length;

    return { 
      routes: updatedRoutes,
      activeRoutesCount: activeRoutes * 32 // Simulated scaling factor
    };
  }),

  resolveIncident: (incidentId) => set((state) => {
    const resolvedIncident = state.incidents.find(i => i.id === incidentId);
    
    if (resolvedIncident) {
      state.addToast(
        state.language === 'ar'
          ? `✅ تم حل بلاغ الطوارئ الخاص بـ ${resolvedIncident.pilgrimNameAr} ونجاح التدخل!`
          : `✅ Resolved emergency incident for ${resolvedIncident.pilgrimNameEn} successfully!`,
        'success'
      );
    }

    const updatedIncidents = state.incidents.map(inc => 
      inc.id === incidentId ? { ...inc, status: 'resolved' as const } : inc
    );

    // If it was the main pilgrim 'Ahmed', reset his status and bracelet
    let updatedPilgrims = state.pilgrims;
    let updatedBracelets = state.bracelets;
    
    if (resolvedIncident?.pilgrimNameAr.includes('أحمد')) {
      updatedPilgrims = state.pilgrims.map(p => 
        p.id === 'PIL-4521' ? { ...p, status: 'safe' as const } : p
      );
      updatedBracelets = state.bracelets.map(b => 
        b.id === 'BRC-8821' ? { ...b, glowingColor: 'green' as const, status: 'online' as const } : b
      );
    }

    return {
      incidents: updatedIncidents,
      pilgrims: updatedPilgrims,
      bracelets: updatedBracelets,
      emergencyCount: Math.max(0, state.emergencyCount - 1),
      activeBraceletColor: resolvedIncident?.pilgrimNameAr.includes('أحمد') ? 'green' as const : state.activeBraceletColor
    };
  }),

  triggerSOS: (pilgrimId) => set((state) => {
    const pilgrim = state.pilgrims.find(p => p.id === pilgrimId);
    if (!pilgrim) return {};

    const newIncident: AlertIncident = {
      id: `INC-${Math.floor(100 + Math.random() * 900)}`,
      pilgrimNameAr: pilgrim.nameAr,
      pilgrimNameEn: pilgrim.nameEn,
      locationAr: pilgrim.locationAr,
      locationEn: pilgrim.locationEn,
      time: new Date().toLocaleTimeString(),
      status: 'pending',
      severity: 'critical',
      typeAr: 'استغاثة يدوية SOS عبر السوار الذكي',
      typeEn: 'Manual SOS via Smart Bracelet',
      lat: pilgrim.lat,
      lng: pilgrim.lng
    };

    const updatedPilgrims = state.pilgrims.map(p => 
      p.id === pilgrimId ? { ...p, status: 'danger' as const } : p
    );

    const updatedBracelets = state.bracelets.map(b => 
      b.pilgrimId === pilgrimId ? { ...b, glowingColor: 'red' as const, status: 'critical' as const } : b
    );

    state.addToast(
      state.language === 'ar'
        ? `🚨 إنذار أحمر! نداء استغاثة SOS مباشر من الحاج: ${pilgrim.nameAr}!`
        : `🚨 Red Alert! Live SOS distress call from pilgrim: ${pilgrim.nameEn}!`,
      'danger'
    );

    return {
      incidents: [newIncident, ...state.incidents],
      pilgrims: updatedPilgrims,
      bracelets: updatedBracelets,
      emergencyCount: state.emergencyCount + 1
    };
  }),

  addIncident: (incident) => set((state) => {
    const newIncident: AlertIncident = {
      ...incident,
      id: `INC-${Math.floor(100 + Math.random() * 900)}`,
      time: new Date().toLocaleTimeString(),
      status: 'pending'
    };
    return {
      incidents: [newIncident, ...state.incidents],
      emergencyCount: state.emergencyCount + 1
    };
  }),

  linkBraceletToPilgrim: (braceletId, pilgrimId) => set((state) => {
    const pilgrim = state.pilgrims.find(p => p.id === pilgrimId);
    const updatedBracelets = state.bracelets.map(b => 
      b.id === braceletId ? { ...b, pilgrimId: pilgrimId, status: 'online' as const } : b
    );
    const updatedPilgrims = state.pilgrims.map(p => 
      p.id === pilgrimId ? { ...p, braceletId: braceletId } : p
    );

    state.addToast(
      state.language === 'ar'
        ? `🔗 تم ربط السوار ${braceletId} بنجاح بالحاج: ${pilgrim?.nameAr}`
        : `🔗 Bracelet ${braceletId} successfully linked to pilgrim: ${pilgrim?.nameEn}`,
      'success'
    );

    return {
      bracelets: updatedBracelets,
      pilgrims: updatedPilgrims
    };
  }),

  updateBraceletColor: (braceletId, color) => set((state) => {
    const updatedBracelets = state.bracelets.map(b => 
      b.id === braceletId ? { ...b, glowingColor: color } : b
    );
    return { bracelets: updatedBracelets };
  }),

  // Real-time ticking simulator for active numbers
  tickSimulation: () => set((state) => {
    // 1. Tick total pilgrims slightly upward (live pilgrims arriving/checking in)
    const extraPilgrims = Math.floor(Math.random() * 3) + 1;
    const nextTotal = state.totalPilgrims + extraPilgrims;

    // 2. Tick current crowd density slightly
    const crowdDelta = Math.floor(Math.random() * 11) - 5;
    const nextCrowd = Math.max(1000000, state.currentCrowdCount + crowdDelta);

    // 3. Fluctuations in sensor telemetry: battery drain, heart rate
    const updatedPilgrims = state.pilgrims.map(p => {
      // battery drain: 0.1% chance of losing 1% battery
      const nextBattery = Math.max(1, p.battery - (Math.random() > 0.99 ? 1 : 0));
      // heart rate fluctuates
      const hrFluctuation = Math.floor(Math.random() * 5) - 2;
      const nextHeartRate = Math.max(60, Math.min(140, p.heartRate + hrFluctuation));
      return { ...p, battery: nextBattery, heartRate: nextHeartRate };
    });

    // 4. Update bracelet sensor telemetry
    const updatedBracelets = state.bracelets.map(b => {
      const matchPilgrim = updatedPilgrims.find(p => p.braceletId === b.id);
      return {
        ...b,
        battery: matchPilgrim ? matchPilgrim.battery : b.battery,
        rssi: Math.max(-100, Math.min(-40, b.rssi + (Math.floor(Math.random() * 5) - 2)))
      };
    });

    // 5. Update safety rate slightly based on emergency counts
    const safetyDelta = state.emergencyCount > 5 ? -0.1 : (state.emergencyCount === 0 ? 0.02 : 0.005);
    const nextSafety = Math.max(90, Math.min(100, state.safetyRate + safetyDelta));

    return {
      totalPilgrims: nextTotal,
      currentCrowdCount: nextCrowd,
      pilgrims: updatedPilgrims,
      bracelets: updatedBracelets,
      safetyRate: parseFloat(nextSafety.toFixed(2))
    };
  })
}));
