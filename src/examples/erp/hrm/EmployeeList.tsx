import { MoreHorizontal, Mail, Phone, Search, Filter } from 'lucide-react';
import { Table, TableColumn } from '../../../components/organisms/Table/Table';
import { Avatar } from '../../../components/atoms/Avatar/Avatar';
import { Badge } from '../../../components/atoms/Badge/Badge';
import { Button } from '../../../components/atoms/Button/Button';
import { Input } from '../../../components/atoms/Input/Input';
import { Card } from '../../../components/atoms/Card/Card';
import { Heading } from '../../../components/atoms/Heading/Heading';
import { Icon } from '../../../components/atoms/Icon/Icon';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'on_leave' | 'terminated';
  email: string;
  phone: string;
  avatarUrl?: string;
  joinDate: string;
}

const employees: Employee[] = [
  { id: '1', name: 'Nguyen Van A', role: 'Senior Developer', department: 'Engineering', status: 'active', email: 'a.nguyen@company.com', phone: '0901234567', joinDate: '2022-01-15' },
  { id: '2', name: 'Tran Thi B', role: 'Product Manager', department: 'Product', status: 'active', email: 'b.tran@company.com', phone: '0909876543', joinDate: '2021-06-01', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
  { id: '3', name: 'Le Van C', role: 'Designer', department: 'Design', status: 'on_leave', email: 'c.le@company.com', phone: '0912345678', joinDate: '2023-03-10' },
  { id: '4', name: 'Pham Thi D', role: 'HR Specialist', department: 'Human Resources', status: 'active', email: 'd.pham@company.com', phone: '0987654321', joinDate: '2020-11-20' },
  { id: '5', name: 'Hoang Van E', role: 'Marketing Lead', department: 'Marketing', status: 'terminated', email: 'e.hoang@company.com', phone: '0976543210', joinDate: '2019-08-05' },
];

export const EmployeeList = () => {
  const columns: TableColumn<Employee>[] = [
    {
      key: 'name',
      label: 'Employee',
      render: (row: Employee) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatarUrl} initials={row.name.charAt(0)} size="md" />
          <div>
            <div className="font-medium text-text-primary">{row.name}</div>
            <div className="text-xs text-text-secondary">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role & Dept',
      render: (row: Employee) => (
        <div>
           <div className="text-sm font-medium">{row.role}</div>
           <div className="text-xs text-text-secondary">{row.department}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: Employee) => {
        const variants: Record<string, 'success' | 'warning' | 'danger'> = {
          active: 'success',
          on_leave: 'warning',
          terminated: 'danger',
        };
        const labels: Record<string, string> = {
            active: 'Active',
            on_leave: 'On Leave',
            terminated: 'Terminated'
        };
        return <Badge variant={variants[row.status]} size="sm">{labels[row.status]}</Badge>;
      }
    },
    {
        key: 'contact',
        label: 'Contact',
        render: (row: Employee) => (
            <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-text-muted hover:text-primary-600" title={row.email}>
                    <Icon icon={Mail} size="xs" />
                </Button>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8 text-text-muted hover:text-primary-600" title={row.phone}>
                    <Icon icon={Phone} size="xs" />
                </Button>
            </div>
        )
    },
    {
      key: 'joinDate',
      label: 'Joined',
      render: (row: Employee) => <span className="text-sm text-text-secondary">{row.joinDate}</span>
    },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: () => (
        <Button variant="ghost" size="sm" className="p-1 text-text-muted">
          <Icon icon={MoreHorizontal} size="sm" />
        </Button>
      ),
    },
  ];

  return (
    <Card padding="none" className="overflow-hidden">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Heading as="h3" size="md">Employees</Heading>
            <div className="flex gap-2">
                <div className="relative">
                    <Icon icon={Search} size="xs" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <Input placeholder="Search..." className="pl-9 w-full sm:w-64" />
                </div>
                <Button variant="secondary" className="gap-2">
                    <Icon icon={Filter} size="xs" />
                    Filter
                </Button>
                <Button variant="primary">Add Employee</Button>
            </div>
        </div>
      <Table
        data={employees}
        columns={columns}
        rowKey={(row: Employee) => row.id}
        striped
        stickyHeader
      />
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50">
          <div className="text-xs text-text-secondary">Showing 5 of 124 employees</div>
      </div>
    </Card>
  );
};
