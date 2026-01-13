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
export declare const EmployeeList: () => import("react/jsx-runtime").JSX.Element;
