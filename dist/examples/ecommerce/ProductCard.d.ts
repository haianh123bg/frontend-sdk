export interface ProductCardProps {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    isSale?: boolean;
    colors?: string[];
    sizes?: string[];
    onAddToCart?: () => void;
    onWishlist?: () => void;
    onQuickView?: () => void;
    className?: string;
}
export declare const ProductCard: ({ name, brand, price, originalPrice, imageUrl, rating, reviewCount, isNew, isSale, colors, sizes, onAddToCart, onWishlist, onQuickView, className, }: ProductCardProps) => import("react/jsx-runtime").JSX.Element;
