import { BookOpen, Heart, Share2 } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Button } from '../../components/atoms/Button/Button';
import { Image } from '../../components/atoms/Image/Image';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Badge } from '../../components/atoms/Badge/Badge';
import { Rating } from '../../components/atoms/Rating/Rating';
import { Title, Text, Caption } from '../../components/atoms/TypographyPrimitives';

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

export const BookCard = ({
  title,
  author,
  coverUrl,
  rating = 0,
  reviewCount = 0,
  price,
  category,
  isBestSeller,
  onRead,
  onWishlist,
  className,
}: BookCardProps) => {
  return (
    <Card
      className={className}
      padding="none"
      media={
        <div className="relative group aspect-[2/3] w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt={title}
            aspectRatio="3/2"
            objectFit="cover"
            className="rounded-none w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isBestSeller && (
             <div className="absolute top-0 right-0">
                <Badge variant="warning" className="rounded-none rounded-bl-lg font-bold shadow-sm">
                   Best Seller
                </Badge>
             </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
             <Button variant="primary" fullWidth onClick={onRead} className="shadow-lg">
                <Icon icon={BookOpen} size="sm" className="mr-2" />
                Read Sample
             </Button>
             <Button variant="secondary" fullWidth onClick={onWishlist} className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-sm">
                <Icon icon={Heart} size="sm" className="mr-2" />
                Wishlist
             </Button>
          </div>
        </div>
      }
    >
      <div className="p-4 flex flex-col gap-2">
        <div className="space-y-1">
           {category && <Caption className="text-primary-600 font-semibold uppercase tracking-wider text-[10px]">{category}</Caption>}
           <Title className="text-lg font-bold leading-tight line-clamp-2" title={title}>{title}</Title>
           <Text className="text-sm text-text-secondary line-clamp-1">{author}</Text>
        </div>

        <div className="flex items-center gap-1">
           <Rating value={rating} readOnly size="sm" max={5} />
           <Caption className="ml-1 text-xs">({reviewCount})</Caption>
        </div>

        <div className="pt-2 mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
           <Text className="font-bold text-lg text-primary-600">{price || 'Free'}</Text>
           <Button variant="ghost" size="sm" className="p-2 h-auto text-text-muted hover:text-primary-600">
              <Icon icon={Share2} size="sm" />
           </Button>
        </div>
      </div>
    </Card>
  );
};
