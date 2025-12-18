import { Printer, Download, Send, AlertCircle } from 'lucide-react';
import { Card } from '../../../components/atoms/Card/Card';
import { Text, Caption } from '../../../components/atoms/TypographyPrimitives';
import { Heading } from '../../../components/atoms/Heading/Heading';
import { Badge } from '../../../components/atoms/Badge/Badge';
import { Button } from '../../../components/atoms/Button/Button';
import { Icon } from '../../../components/atoms/Icon/Icon';
import { Divider } from '../../../components/atoms/Divider/Divider';
import { Table, TableColumn } from '../../../components/organisms/Table/Table';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  tax: number;
}

export interface InvoiceProps {
  id: string;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  customer: {
    name: string;
    address: string;
    email: string;
  };
  items: InvoiceItem[];
}

export const Invoice = ({
  id,
  date,
  dueDate,
  status,
  customer,
  items
}: InvoiceProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalTax = items.reduce((sum, item) => sum + (item.quantity * item.price * item.tax / 100), 0);
  const total = subtotal + totalTax;

  const statusVariants: Record<string, 'success' | 'warning' | 'danger'> = {
      paid: 'success',
      pending: 'warning',
      overdue: 'danger'
  };

  const columns: TableColumn<InvoiceItem>[] = [
      { key: 'description', label: 'Description', width: '50%' },
      { key: 'quantity', label: 'Qty', align: 'center', width: '10%' },
      { key: 'price', label: 'Price', align: 'right', render: (row: InvoiceItem) => `$${row.price.toFixed(2)}` },
      { key: 'tax', label: 'Tax', align: 'right', render: (row: InvoiceItem) => `${row.tax}%` },
      { key: 'total', label: 'Total', align: 'right', render: (row: InvoiceItem) => `$${(row.quantity * row.price).toFixed(2)}` }
  ];

  return (
    <Card padding="lg" className="max-w-4xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
           <div>
               <div className="flex items-center gap-3 mb-2">
                   <Heading as="h1" size="2xl" className="text-primary-600">INVOICE</Heading>
                   <Badge variant={statusVariants[status]} size="md" className="uppercase tracking-wider">
                       {status}
                   </Badge>
               </div>
               <Text className="text-text-secondary font-medium">#{id}</Text>
           </div>
           <div className="text-right">
               <Heading as="h4" size="md" className="mb-1">Redon Corp</Heading>
               <Caption>123 Business Rd, Tech City</Caption>
               <Caption>contact@redon.com</Caption>
           </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div>
               <Heading as="h5" size="sm" className="text-text-muted uppercase mb-2">Bill To</Heading>
               <Text className="font-bold">{customer.name}</Text>
               <Text className="text-text-secondary">{customer.address}</Text>
               <Text className="text-text-secondary">{customer.email}</Text>
           </div>
           <div className="grid grid-cols-2 gap-4">
               <div>
                   <Heading as="h5" size="sm" className="text-text-muted uppercase mb-1">Invoice Date</Heading>
                   <Text className="font-medium">{date}</Text>
               </div>
               <div>
                   <Heading as="h5" size="sm" className="text-text-muted uppercase mb-1">Due Date</Heading>
                   <Text className="font-medium">{dueDate}</Text>
               </div>
           </div>
       </div>

       <div className="mb-8">
           <Table 
             data={items} 
             columns={columns} 
             rowKey={(row: InvoiceItem) => row.id} 
             striped 
             size="sm"
             rowStyle="bordered"
           />
       </div>

       <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
           <div className="flex-1">
               {status === 'overdue' && (
                   <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                       <Icon icon={AlertCircle} size="sm" className="mt-0.5 shrink-0" />
                       <p>This invoice is overdue. Please arrange payment as soon as possible to avoid service interruption.</p>
                   </div>
               )}
           </div>
           <div className="w-full md:w-64 space-y-3">
               <div className="flex justify-between text-sm">
                   <span className="text-text-secondary">Subtotal</span>
                   <span className="font-medium">${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm">
                   <span className="text-text-secondary">Tax</span>
                   <span className="font-medium">${totalTax.toFixed(2)}</span>
               </div>
               <Divider />
               <div className="flex justify-between text-lg font-bold">
                   <span>Total</span>
                   <span className="text-primary-600">${total.toFixed(2)}</span>
               </div>
           </div>
       </div>
       
       <Divider className="mb-6" />
       
       <div className="flex flex-wrap gap-3 justify-end">
           <Button variant="secondary" className="gap-2">
               <Icon icon={Printer} size="sm" />
               Print
           </Button>
           <Button variant="secondary" className="gap-2">
               <Icon icon={Download} size="sm" />
               Download PDF
           </Button>
           <Button variant="primary" className="gap-2">
               <Icon icon={Send} size="sm" />
               Send Invoice
           </Button>
       </div>
    </Card>
  );
};
