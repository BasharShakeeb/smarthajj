"use client";

import React from 'react';
import { AlertCircle, CheckCircle2, Clock, MoreVertical } from 'lucide-react';
import { useStore } from '@/store/useStore';

const alertsData = {
  ar: [
    { id: 1, type: 'حرجة',    message: 'تجاوزت كثافة الحشود الحد المسموح به في المنطقة أ', time: 'منذ دقيقتين', status: 'نشط'         },
    { id: 2, type: 'تحذير',   message: 'ارتفاع درجة الحرارة في خيمة الحجاج 402',           time: 'منذ 15 دقيقة', status: 'قيد الانتظار' },
    { id: 3, type: 'معلومات', message: 'تمت جدولة مغادرة الدفعة 44',                        time: 'منذ ساعة',    status: 'تم الحل'       },
    { id: 4, type: 'حرجة',    message: 'طلب مساعدة طبية عند البوابة 4',                    time: 'منذ ساعتين',  status: 'نشط'           },
  ],
  en: [
    { id: 1, type: 'CRITICAL', message: 'Crowd density exceeded limit in Zone A',     time: '2 mins ago',  status: 'Active'   },
    { id: 2, type: 'WARNING',  message: 'Temperature rising in Pilgrim Tent 402',     time: '15 mins ago', status: 'Pending'  },
    { id: 3, type: 'INFO',     message: 'Batch 44 departure scheduled',               time: '1 hour ago',  status: 'Resolved' },
    { id: 4, type: 'CRITICAL', message: 'Medical assistance requested at Gate 4',     time: '2 hours ago', status: 'Active'   },
  ]
};

/* ── helpers ────────────────────────────────────────────────── */
const statusStyle = (status: string) => {
  const active   = ['نشط',         'Active'];
  const pending  = ['قيد الانتظار','Pending'];
  if (active.includes(status))   return 'text-danger';
  if (pending.includes(status))  return 'text-secondary';
  return 'text-success';
};

const statusIcon = (status: string) => {
  const active   = ['نشط',         'Active'];
  const pending  = ['قيد الانتظار','Pending'];
  if (active.includes(status))  return <AlertCircle  size={16} />;
  if (pending.includes(status)) return <Clock        size={16} />;
  return                               <CheckCircle2 size={16} />;
};

const badgeStyle = (type: string) => {
  const critical = ['حرجة',    'CRITICAL'];
  const warning  = ['تحذير',   'WARNING'];
  if (critical.includes(type)) return 'bg-danger/10   border-danger/25   text-danger';
  if (warning.includes(type))  return 'bg-secondary/10 border-secondary/25 text-secondary';
  return                              'bg-success/10   border-success/25   text-success';
};

export const AlertsTable = () => {
  const { language } = useStore();
  const alerts = alertsData[language];

  const headers =
    language === 'ar'
      ? ['الحالة', 'نوع التنبيه', 'الرسالة', 'الوقت', 'الإجراء']
      : ['Status', 'Alert Type',  'Message',  'Time',  'Action'  ];

  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} border-collapse`}>
        <thead>
          <tr className="border-b border-border">
            {headers.map((h) => (
              <th key={h} className="py-3 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {alerts.map((alert) => (
            <tr key={alert.id} className="hover:bg-primary/3 transition-colors group">

              {/* Status */}
              <td className="py-4 px-4">
                <div className={`flex items-center gap-2 ${statusStyle(alert.status)}`}>
                  {statusIcon(alert.status)}
                  <span className="text-sm font-medium">{alert.status}</span>
                </div>
              </td>

              {/* Badge */}
              <td className="py-4 px-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeStyle(alert.type)}`}>
                  {alert.type}
                </span>
              </td>

              {/* Message */}
              <td className="py-4 px-4 text-sm">{alert.message}</td>

              {/* Time */}
              <td className="py-4 px-4 text-sm text-muted-foreground whitespace-nowrap">{alert.time}</td>

              {/* Action */}
              <td className="py-4 px-4">
                <button className="p-1.5 hover:bg-secondary/10 rounded-lg transition-colors text-muted-foreground hover:text-secondary">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
