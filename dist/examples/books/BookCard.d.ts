export interface BookCardProps {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    rating?: number;
    reviewCount?: number;
    price?: string;
    category?: string;
    isBestSeller?: boolean;
    onRead?: () => void;
    onWishlist?: () => void;
    className?: string;
}
export declare const BookCard: ({ title, author, coverUrl, rating, reviewCount, price, category, isBestSeller, onRead, onWishlist, className, }: BookCardProps) => import("react/jsx-runtime").JSX.Element;
