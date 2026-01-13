export interface CartItem {
    id: string;
    name: string;
    brand?: string;
    price: number;
    quantity: number;
    imageUrl: string;
    attributes?: string[];
}
export interface CartProps {
    items: CartItem[];
    onUpdateQuantity?: (id: string, quantity: number) => void;
    onRemove?: (id: string) => void;
    onCheckout?: () => void;
    className?: string;
}
export declare const Cart: ({ items, onUpdateQuantity, onRemove, onCheckout, className, }: CartProps) => import("react/jsx-runtime").JSX.Element;
