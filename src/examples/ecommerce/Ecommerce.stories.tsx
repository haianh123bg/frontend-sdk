import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import { Cart, CartItem } from './Cart';

const meta = {
  title: 'Examples/Ecommerce',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

export const Product: StoryObj<typeof ProductCard> = {
  render: () => (
    <div className="w-[280px]">
      <ProductCard
        id="1"
        name="Minimalist Leather Watch"
        brand="Nordic"
        price={129.00}
        originalPrice={159.00}
        imageUrl="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop"
        rating={4.5}
        reviewCount={42}
        isNew={true}
        isSale={true}
        colors={['#000000', '#8B4513', '#D2691E']}
      />
    </div>
  ),
};

const cartItems: CartItem[] = [
    {
        id: '1',
        name: 'Classic White Sneakers',
        brand: 'Nike',
        price: 89.99,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=200&auto=format&fit=crop',
        attributes: ['Size: 42', 'Color: White']
    },
    {
        id: '2',
        name: 'Basic Cotton T-Shirt',
        brand: 'Uniqlo',
        price: 19.99,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop',
        attributes: ['Size: L', 'Color: Black']
    }
];

export const ShoppingCart: StoryObj<typeof Cart> = {
  render: () => (
    <div className="w-full max-w-5xl">
      <Cart items={cartItems} />
    </div>
  ),
};
