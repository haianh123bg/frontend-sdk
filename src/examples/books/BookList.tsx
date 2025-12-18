import { List, ListItem } from '../../components/molecules/List/List';
import { Button } from '../../components/atoms/Button/Button';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Badge } from '../../components/atoms/Badge/Badge';
import { ChevronRight } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Heading } from '../../components/atoms/Heading/Heading';

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

export const BookList = ({ books, title = "My Library", className, onItemClick }: BookListProps) => {
  
  const getStatusBadge = (status: Book['status']) => {
    switch(status) {
      case 'reading': return <Badge variant="info" size="sm">Reading</Badge>;
      case 'completed': return <Badge variant="success" size="sm">Done</Badge>;
      default: return <Badge variant="default" size="sm">Later</Badge>;
    }
  };

  const listItemsFixed: ListItem[] = books.map(book => ({
    id: book.id,
    title: book.title,
    description: book.author,
    icon: (
      <div className="w-10 h-14 overflow-hidden rounded shadow-sm">
         <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
      </div>
    ),
    meta: book.progress ? `${book.progress}%` : undefined,
    actions: (
        <div className="flex items-center gap-2">
            <div className="hidden sm:block">
                 {getStatusBadge(book.status)}
            </div>
            <Button variant="ghost" size="sm" className="p-1">
                <Icon icon={ChevronRight} size="md" className="text-gray-400" />
            </Button>
        </div>
    )
  }));

  return (
    <Card className={className} padding="none">
       <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
           <Heading as="h3" size="lg">{title}</Heading>
       </div>
       <List 
         items={listItemsFixed} 
         onItemClick={(_item, index) => onItemClick?.(books[index])}
         size="lg"
       />
    </Card>
  );
};
