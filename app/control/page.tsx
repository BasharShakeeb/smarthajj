"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { MapMock } from '@/components/MapMock';
import { Button } from '@/components/Button';
import { Radio, Power, Users, Map as MapIcon, ShieldAlert, AlertTriangle, X, Send, Wifi } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { translations } from '@/lib/translations';

export default function ControlPage() {
  const { language, addToast } = useStore();
  const t = translations[language];
  const iconDir = language === 'ar' ? 'ml-3' : 'mr-3';

  // Modal & Broadcast States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState('mina');
  const [alertMsg, setAlertMsg] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);

  const modalLabels = {
    ar: {
      modalTitle: "بوابة البث العاجل للأقمار الصناعية",
      modalDesc: "إرسال رسائل بث فوري وتنبيهات طوارئ للحجاج والضباط الميدانيين في المنطقة المحددة.",
      selectZone: "اختر المنطقة التشغيلية المستهدفة",
      messageLabel: "نص رسالة التحذير العاجلة",
      sendBtn: "بث الإنذار العاجل الآن",
      sending: "جاري تشفير وتأمين البث عبر البوابات التشغيلية...",
      successMsg: "تم إرسال بث الطوارئ بنجاح لجميع الأجهزة النشطة في المنطقة!",
      placeholder: "يرجى كتابة تعليمات الأمان (مثال: يرجى التوجيه بإيقاف تدفق الحشود مؤقتاً باتجاه الجمرات)..."
    },
    en: {
      modalTitle: "Satellite Emergency Broadcast Portal",
      modalDesc: "Send instant broadcast alerts and emergency triggers to pilgrims and field officers in the targeted zone.",
      selectZone: "Select Target Operational Zone",
      messageLabel: "Emergency Warning Text",
      sendBtn: "Broadcast Urgent Warning Now",
      sending: "Encrypting and transmitting broadcast via satellite gateways...",
      successMsg: "Emergency warning broadcasted successfully to all active devices in the zone!",
      placeholder: "Enter operational safety warnings (e.g. Pause batch flow towards Jamarat immediately)..."
    }
  };

  const l = modalLabels[language];

  const zoneData = [
    { id: 'mina', name: t.zones.mina,   status: t.status.clear,    dot: 'bg-primary'   },
    { id: 'arafat', name: t.zones.arafat, status: t.status.busy,     dot: 'bg-secondary' },
    { id: 'muzd', name: t.zones.muzd,   status: t.status.clear,    dot: 'bg-primary'   },
    { id: 'grand', name: t.zones.grand,  status: t.status.critical, dot: 'bg-danger'    },
  ];

  // Handle emergency broadcast click simulation
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertMsg.trim()) {
      addToast(language === 'ar' ? 'يرجى كتابة نص الرسالة أولاً!' : 'Please enter warning message text first!', 'danger');
      return;
    }

    setIsSending(true);
    setSendProgress(0);
  };

  // Simulate progress bar countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSending) {
      timer = setInterval(() => {
        setSendProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsSending(false);
            setIsModalOpen(false);
            setAlertMsg('');
            addToast(l.successMsg, 'success');
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isSending, l.successMsg, addToast]);

  return (
    <div className="space-y-8 relative">

      {/* Header */}
      <div className="flex justify-between items-end flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.controlTitle}</h1>
          <p className="text-muted-foreground mt-1">{t.controlDesc}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20">
            <Radio size={13} className="animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">{t.opMode}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

        {/* Left Panel */}
        <div className="xl:col-span-1 space-y-6">

          {/* Quick Actions */}
          <Card title={t.quickActions}>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start hover:scale-102 transition-transform duration-200"
                onClick={() => addToast(language === 'ar' ? 'جاري توجيه فرق الدعم والانتشار الأمني الميداني...' : 'Deploying security and support teams...', 'info')}
              >
                <ShieldAlert size={17} className={`${iconDir} text-secondary`} />
                {t.deploySecurity}
              </Button>
              <Button
                variant="outline"
                className="justify-start hover:scale-102 transition-transform duration-200"
                onClick={() => addToast(language === 'ar' ? 'تم البدء في إعادة توجيه الأفواج التشغيلية.' : 'Started redirecting crowd batches.', 'success')}
              >
                <Users size={17} className={`${iconDir} text-primary`} />
                {t.redirectBatch}
              </Button>
              <Button
                variant="outline"
                className="justify-start hover:scale-102 transition-transform duration-200"
                onClick={() => addToast(language === 'ar' ? 'جاري إرسال المسارات المحدثة لهواتف الضباط والحجاج...' : 'Syncing updated routes to devices...', 'info')}
              >
                <MapIcon size={17} className={`${iconDir} text-info`} />
                {t.updateRoutes}
              </Button>
              <Button
                variant="danger"
                className="justify-start hover:scale-102 transition-all duration-200 shadow-lg shadow-danger/10 hover:shadow-danger/20"
                onClick={() => setIsModalOpen(true)}
              >
                <Power size={17} className={iconDir} />
                {t.emergencyBroadcast}
              </Button>
            </div>
          </Card>

          {/* Zone Status */}
          <Card title={t.zoneStatus}>
            <div className="space-y-3">
              {zoneData.map((zone) => (
                <div key={zone.name} className="flex items-center justify-between py-1 group hover:bg-muted/30 px-1 rounded-lg transition-colors">
                  <span className="text-sm font-medium">{zone.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{zone.status}</span>
                    <div className="relative flex h-2.5 w-2.5">
                      {zone.dot === 'bg-danger' && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                      )}
                      <div className={`relative inline-flex rounded-full h-2.5 w-2.5 ${zone.dot}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Central Map */}
        <div className="xl:col-span-3">
          <MapMock />
        </div>
      </div>

      {/* ── HIGH-FIDELITY EMERGENCY BROADCAST MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div
            className="w-full max-w-lg bg-card border border-border glass rounded-3xl overflow-hidden shadow-2xl animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-danger/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                  <AlertTriangle size={20} className="animate-bounce" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">{l.modalTitle}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <Wifi size={12} className="text-success animate-pulse" />
                    <span>Sat-Gateway Connect: ACTIVE</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => !isSending && setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                disabled={isSending}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleBroadcast} className="p-6 space-y-6">
              <p className="text-xs text-muted-foreground leading-relaxed">{l.modalDesc}</p>

              {/* Target Zone */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{l.selectZone}</label>
                <div className="grid grid-cols-2 gap-2">
                  {zoneData.map((zone) => (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => !isSending && setSelectedZone(zone.id)}
                      className={`
                        p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all duration-200
                        ${selectedZone === zone.id
                          ? 'border-danger bg-danger/5 text-danger shadow-sm'
                          : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted'
                        }
                      `}
                      disabled={isSending}
                    >
                      <span>{zone.name}</span>
                      <div className={`w-2 h-2 rounded-full ${zone.dot}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message text area */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{l.messageLabel}</label>
                <textarea
                  value={alertMsg}
                  onChange={(e) => setAlertMsg(e.target.value)}
                  className="w-full min-h-[100px] bg-muted/50 border border-border rounded-2xl p-4 text-sm resize-none focus:border-danger focus:ring-1 focus:ring-danger"
                  placeholder={l.placeholder}
                  disabled={isSending}
                />
              </div>

              {/* Sending state progress */}
              {isSending ? (
                <div className="space-y-3 py-2 bg-muted/20 p-4 rounded-2xl border border-border">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-danger animate-pulse flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-danger animate-ping" />
                      {l.sending}
                    </span>
                    <span>{sendProgress}%</span>
                  </div>
                  <div className="w-full bg-muted border border-border h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-danger rounded-full transition-all duration-200"
                      style={{ width: `${sendProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button
                    type="submit"
                    variant="danger"
                    className="flex-2 flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    <span>{l.sendBtn}</span>
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
