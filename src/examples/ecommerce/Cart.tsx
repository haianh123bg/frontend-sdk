import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Button } from '../../components/atoms/Button/Button';
import { Image } from '../../components/atoms/Image/Image';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Text, Caption } from '../../components/atoms/TypographyPrimitives';
import { Heading } from '../../components/atoms/Heading/Heading';
import { Input } from '../../components/atoms/Input/Input';
import { Divider } from '../../components/atoms/Divider/Divider';

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

export const Cart = ({
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  className,
}: CartProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10; // Mock shipping
  const total = subtotal + shipping;

  if (items.length === 0) {
      return (
          <Card className={className} padding="lg">
              <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <Icon icon={ShoppingBag} size="2xl" />
                  </div>
                  <div className="space-y-1">
                      <Heading as="h3" size="lg">Your cart is empty</Heading>
                      <Text className="text-text-secondary">Looks like you haven't added anything yet.</Text>
                  </div>
                  <Button variant="primary" onClick={() => console.log('Continue shopping')}>Start Shopping</Button>
              </div>
          </Card>
      )
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      <div className="lg:col-span-2 space-y-4">
        <Card padding="none">
             <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
                 <Heading as="h3" size="md">Shopping Cart ({items.length})</Heading>
             </div>
             <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                 {items.map((item) => (
                     <div key={item.id} className="p-4 flex gap-4">
                         <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800">
                             <Image src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-none" />
                         </div>
                         <div className="flex-1 flex flex-col justify-between">
                             <div className="flex justify-between items-start gap-2">
                                 <div>
                                     <Caption className="text-xs uppercase tracking-wide">{item.brand}</Caption>
                                     <Text className="font-medium line-clamp-2">{item.name}</Text>
                                     {item.attributes && (
                                         <div className="flex gap-2 mt-1">
                                             {item.attributes.map((attr, idx) => (
                                                 <Caption key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">{attr}</Caption>
                                             ))}
                                         </div>
                                     )}
                                 </div>
                                 <Text className="font-bold whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</Text>
                             </div>
                             
                             <div className="flex items-center justify-between mt-2">
                                 <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-lg">
                                     <button 
                                        className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-l-lg disabled:opacity-50"
                                        onClick={() => onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))}
                                        disabled={item.quantity <= 1}
                                     >
                                         <Icon icon={Minus} size="xs" />
                                     </button>
                                     <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                     <button 
                                        className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-r-lg"
                                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                                     >
                                         <Icon icon={Plus} size="xs" />
                                     </button>
                                 </div>
                                 
                                 <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => onRemove?.(item.id)}
                                 >
                                     <Icon icon={Trash2} size="sm" className="mr-1.5" />
                                     Remove
                                 </Button>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
        </Card>
      </div>
      
      <div className="space-y-6">
          <Card padding="lg" className="space-y-4">
              <Heading as="h3" size="md">Order Summary</Heading>
              
              <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                      <Text className="text-text-secondary">Subtotal</Text>
                      <Text className="font-medium">${subtotal.toFixed(2)}</Text>
                  </div>
                  <div className="flex justify-between text-sm">
                      <Text className="text-text-secondary">Shipping</Text>
                      <Text className="font-medium">${shipping.toFixed(2)}</Text>
                  </div>
                  <div className="flex justify-between text-sm">
                      <Text className="text-text-secondary">Tax</Text>
                      <Text className="font-medium text-text-muted">Calculated at checkout</Text>
                  </div>
              </div>
              
              <Divider />
              
              <div className="flex justify-between items-end">
                  <Text className="font-bold text-lg">Total</Text>
                  <Text className="font-bold text-xl text-primary-600">${total.toFixed(2)}</Text>
              </div>
              
              <Button variant="primary" fullWidth size="lg" onClick={onCheckout} className="mt-4 shadow-lg shadow-primary-500/20">
                  Checkout
                  <Icon icon={ArrowRight} size="md" className="ml-2" />
              </Button>
          </Card>
          
          <Card padding="md">
              <div className="space-y-2">
                  <Text className="font-medium">Have a promo code?</Text>
                  <div className="flex gap-2">
                      <Input placeholder="Enter code" fullWidth />
                      <Button variant="secondary">Apply</Button>
                  </div>
              </div>
          </Card>
      </div>
    </div>
  );
};
