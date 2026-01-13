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
export declare const Invoice: ({ id, date, dueDate, status, customer, items }: InvoiceProps) => import("react/jsx-runtime").JSX.Element;
