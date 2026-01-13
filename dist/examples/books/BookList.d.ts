export interface Book {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    rating: number;
    status: 'reading' | 'completed' | 'wishlist';
    progress?: number;
}
export interface BookListProps {
    books: Book[];
    title?: string;
    className?: string;
    onItemClick?: (book: Book) => void;
}
export declare const BookList: ({ books, title, className, onItemClick }: BookListProps) => import("react/jsx-runtime").JSX.Element;
