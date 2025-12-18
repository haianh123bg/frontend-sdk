import type { Meta, StoryObj } from '@storybook/react';
import { EmployeeList } from './hrm/EmployeeList';
import { DealBoard } from './crm/DealBoard';
import { Invoice } from './finance/Invoice';
import { InventoryDashboard } from './inventory/InventoryDashboard';

const meta = {
  title: 'Examples/ERP',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

export const HRM_EmployeeList: StoryObj = {
  render: () => (
    <div className="p-6 bg-slate-50 dark:bg-zinc-900 min-h-screen">
       <EmployeeList />
    </div>
  ),
};

export const CRM_DealBoard: StoryObj = {
  render: () => (
    <div className="h-screen bg-slate-100 dark:bg-zinc-950 p-2">
       <DealBoard />
    </div>
  ),
};

export const Finance_Invoice: StoryObj = {
  render: () => (
    <div className="p-6 bg-slate-100 dark:bg-zinc-900 min-h-screen">
       <Invoice 
         id="INV-2024-001"
         date="Mar 10, 2024"
         dueDate="Mar 24, 2024"
         status="pending"
         customer={{
             name: "Acme Solutions Ltd",
             address: "45 Innovation Dr, Silicon Valley, CA",
             email: "accounts@acme.com"
         }}
         items={[
             { id: '1', description: 'UI/UX Design Services - March', quantity: 80, price: 85, tax: 10 },
             { id: '2', description: 'Frontend Development (React)', quantity: 120, price: 95, tax: 10 },
             { id: '3', description: 'Server Maintenance', quantity: 1, price: 250, tax: 0 }
         ]}
       />
    </div>
  ),
};

export const Inventory_Dashboard: StoryObj = {
  render: () => (
    <div className="p-6 bg-slate-50 dark:bg-zinc-900 min-h-screen">
       <div className="max-w-6xl mx-auto">
          <InventoryDashboard />
       </div>
    </div>
  ),
};
