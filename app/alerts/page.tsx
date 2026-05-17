import React from 'react';
import { Card } from '@/components/Card';
import { AlertsTable } from '@/components/AlertsTable';
import { Filter, Download } from 'lucide-react';
import { Button } from '@/components/Button';

const tabs = ['All Alerts', 'Critical', 'Warnings', 'Information', 'Resolved'];

export default function AlertsPage() {
  return (
    <div className="space-y-8">

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Alerts</h1>
          <p className="text-muted-foreground mt-1">Manage and respond to operational notifications.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Tab Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              i === 0
                ? 'gradient-primary text-white shadow-primary-sm'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card>
        <AlertsTable />
      </Card>
    </div>
  );
}
