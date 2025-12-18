import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { StorageWidget } from './StorageWidget';
import { Users, DollarSign, Activity, ShoppingCart } from 'lucide-react';
import { ResponsiveGrid } from '../../components/atoms/ResponsiveGrid/ResponsiveGrid';

const meta = {
  title: 'Examples/Dashboard',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

export const Statistics: StoryObj = {
  render: () => (
    <div className="max-w-4xl w-full">
      <ResponsiveGrid cols={{ xs: 1, sm: 2, lg: 4 }} gap="md">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={DollarSign}
          iconColor="success"
          trend={{ value: 20.1, isPositive: true, label: "vs last month" }}
        />
        <StatCard
          title="Active Users"
          value="2,350"
          icon={Users}
          iconColor="primary"
          trend={{ value: 10.5, isPositive: true, label: "vs last month" }}
        />
        <StatCard
          title="Bounce Rate"
          value="42.3%"
          icon={Activity}
          iconColor="warning"
          trend={{ value: 4.1, isPositive: false, label: "vs last month" }}
        />
        <StatCard
          title="Sales"
          value="+12,234"
          icon={ShoppingCart}
          iconColor="info"
          trend={{ value: 12.5, isPositive: true, label: "vs last month" }}
        />
      </ResponsiveGrid>
    </div>
  ),
};

export const Widgets: StoryObj<typeof StorageWidget> = {
  render: () => (
    <div className="w-[320px]">
      <StorageWidget
        used={75.5}
        total={100}
        breakdown={{
            documents: 25.5,
            media: 40,
            other: 10
        }}
      />
    </div>
  ),
};
