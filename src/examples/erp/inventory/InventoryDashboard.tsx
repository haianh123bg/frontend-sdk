import { Package, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { Card } from '../../../components/atoms/Card/Card';
import { StatCard } from '../../dashboard/StatCard';
import { Table, TableColumn } from '../../../components/organisms/Table/Table';
import { Badge } from '../../../components/atoms/Badge/Badge';
import { Progress } from '../../../components/atoms/Progress/Progress';
import { Button } from '../../../components/atoms/Button/Button';
import { Heading } from '../../../components/atoms/Heading/Heading';

interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    category: string;
    stock: number;
    minStock: number;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const inventoryData: InventoryItem[] = [
    { id: '1', name: 'Wireless Mouse M1', sku: 'WM-001', category: 'Electronics', stock: 150, minStock: 20, status: 'in_stock' },
    { id: '2', name: 'Mechanical Keyboard K2', sku: 'KB-002', category: 'Electronics', stock: 12, minStock: 15, status: 'low_stock' },
    { id: '3', name: 'Monitor Stand', sku: 'MS-003', category: 'Accessories', stock: 0, minStock: 10, status: 'out_of_stock' },
    { id: '4', name: 'USB-C Hub', sku: 'UH-004', category: 'Electronics', stock: 45, minStock: 10, status: 'in_stock' },
    { id: '5', name: 'Laptop Sleeve', sku: 'LS-005', category: 'Accessories', stock: 8, minStock: 10, status: 'low_stock' },
];

export const InventoryDashboard = () => {
  const columns: TableColumn<InventoryItem>[] = [
      { 
          key: 'name', 
          label: 'Product Name',
          render: (row: InventoryItem) => (
              <div>
                  <div className="font-medium">{row.name}</div>
                  <div className="text-xs text-text-muted">SKU: {row.sku}</div>
              </div>
          )
      },
      { key: 'category', label: 'Category' },
      { 
          key: 'stock', 
          label: 'Stock Level',
          width: '30%',
          render: (row: InventoryItem) => {
              const percentage = Math.min(100, Math.round((row.stock / (row.minStock * 3)) * 100)); // Assume max is 3x min
              return (
                  <div className="flex items-center gap-2">
                      <div className="flex-1">
                          <Progress 
                            value={percentage} 
                            max={100} 
                            size="sm" 
                            variant={row.status === 'out_of_stock' ? 'danger' : row.status === 'low_stock' ? 'secondary' : 'success'} 
                          />
                      </div>
                      <span className="text-xs w-12 text-right">{row.stock} units</span>
                  </div>
              )
          }
      },
      { 
          key: 'status', 
          label: 'Status',
          align: 'center',
          render: (row: InventoryItem) => {
              const map = {
                  in_stock: { variant: 'success', label: 'In Stock' },
                  low_stock: { variant: 'warning', label: 'Low Stock' },
                  out_of_stock: { variant: 'danger', label: 'Out of Stock' }
              } as const;
              const config = map[row.status];
              return <Badge variant={config.variant} size="sm">{config.label}</Badge>
          }
      },
      {
          key: 'action',
          label: '',
          align: 'right',
          render: (row: InventoryItem) => (
              <Button size="sm" variant="ghost" disabled={row.status === 'in_stock'}>
                  Restock
              </Button>
          )
      }
  ];

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
                title="Total Products" 
                value="1,234" 
                icon={Package} 
                iconColor="primary" 
                trend={{value: 12, isPositive: true, label: "vs last month"}}
            />
            <StatCard 
                title="Low Stock Items" 
                value="23" 
                icon={AlertTriangle} 
                iconColor="warning" 
                trend={{value: 5, isPositive: false, label: "needs attention"}}
            />
            <StatCard 
                title="Inventory Value" 
                value="$452K" 
                icon={TrendingUp} 
                iconColor="success" 
                trend={{value: 8.5, isPositive: true, label: "vs last month"}}
            />
        </div>

        <Card padding="none">
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <Heading as="h3" size="md">Inventory Status</Heading>
                <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight size={14} />
                </Button>
            </div>
            <Table 
                data={inventoryData} 
                columns={columns} 
                rowKey={(r: InventoryItem) => r.id}
                striped
            />
        </Card>
    </div>
  );
};
