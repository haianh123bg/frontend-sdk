import React from 'react';
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Button } from '../../components/atoms/Button/Button';
import { Image } from '../../components/atoms/Image/Image';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Badge } from '../../components/atoms/Badge/Badge';
import { Rating } from '../../components/atoms/Rating/Rating';
import { Title, Text, Caption } from '../../components/atoms/TypographyPrimitives';
import { Select } from '../../components/atoms/Select/Select';

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

export const ProductCard = ({
  name,
  brand,
  price,
  originalPrice,
  imageUrl,
  rating = 0,
  reviewCount = 0,
  isNew,
  isSale,
  colors,
  sizes,
  onAddToCart,
  onWishlist,
  onQuickView,
  className,
}: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = React.useState(colors?.[0]);
  
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card
      className={className}
      padding="none"
      media={
        <div className="relative group w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            className="rounded-none w-full h-full object-cover aspect-[3/4]"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && <Badge variant="info" size="sm">NEW</Badge>}
            {isSale && <Badge variant="danger" size="sm">-{discount}%</Badge>}
          </div>
          
          <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
             <Button variant="secondary" size="sm" className="rounded-full w-8 h-8 p-0 shadow-sm" onClick={onWishlist}>
               <Icon icon={Heart} size="sm" />
             </Button>
             <Button variant="secondary" size="sm" className="rounded-full w-8 h-8 p-0 shadow-sm" onClick={onQuickView}>
               <Icon icon={Eye} size="sm" />
             </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm">
             <Button variant="primary" fullWidth onClick={onAddToCart} className="shadow-md">
                <Icon icon={ShoppingCart} size="sm" className="mr-2" />
                Add to Cart
             </Button>
          </div>
        </div>
      }
    >
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <Caption className="text-xs uppercase tracking-wide text-text-muted">{brand}</Caption>
          <Title className="text-base font-medium leading-tight line-clamp-2 min-h-[2.5rem]" title={name}>{name}</Title>
        </div>

        <div className="flex items-end justify-between">
           <div className="flex items-center gap-2">
              <Text className="text-lg font-bold text-primary-600">${price.toFixed(2)}</Text>
              {originalPrice && (
                <Text className="text-sm text-text-muted line-through">${originalPrice.toFixed(2)}</Text>
              )}
           </div>
           <div className="flex items-center gap-1">
             <Rating value={rating} readOnly size="sm" max={1} />
             <Caption className="font-medium text-text-primary">{rating}</Caption>
             <Caption>({reviewCount})</Caption>
           </div>
        </div>

        {(colors || sizes) && (
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
             {colors && (
               <div className="flex gap-1.5">
                 {colors.map(color => (
                   <button
                     key={color}
                     className={`w-4 h-4 rounded-full border border-slate-200 shadow-sm flex items-center justify-center transition-transform hover:scale-110 ${selectedColor === color ? 'ring-1 ring-offset-1 ring-primary-500' : ''}`}
                     style={{ backgroundColor: color }}
                     onClick={() => setSelectedColor(color)}
                     title={color}
                   >
                     {selectedColor === color && <Icon icon={Check} size="xs" className="text-white drop-shadow-sm w-3 h-3" />}
                   </button>
                 ))}
               </div>
             )}
             
             {sizes && (
                <div className="w-20">
                    <Select 
                      options={sizes.map(s => ({ label: s, value: s }))} 
                      placeholder="Size" 
                      compact 
                      variant="ghost" 
                      className="text-xs"
                      dropdownPlacement="top"
                    />
                </div>
             )}
          </div>
        )}
      </div>
    </Card>
  );
};
