import type { Meta, StoryObj } from '@storybook/react';
import { BookCard } from './BookCard';
import { BookList, Book } from './BookList';

const meta = {
  title: 'Examples/Books',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

export const SingleBook: StoryObj<typeof BookCard> = {
  render: () => (
    <div className="w-[200px]">
      <BookCard
        id="1"
        title="The Design of Everyday Things"
        author="Don Norman"
        coverUrl="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop"
        rating={4.5}
        reviewCount={128}
        price="$14.99"
        category="Design"
        isBestSeller={true}
      />
    </div>
  ),
};

const books: Book[] = [
    {
        id: '1',
        title: 'Atomic Habits',
        author: 'James Clear',
        coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&auto=format&fit=crop',
        rating: 5,
        status: 'reading',
        progress: 45
    },
    {
        id: '2',
        title: 'Deep Work',
        author: 'Cal Newport',
        coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop',
        rating: 4,
        status: 'completed',
    },
     {
        id: '3',
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&auto=format&fit=crop',
        rating: 4.8,
        status: 'wishlist',
    }
];

export const LibraryList: StoryObj<typeof BookList> = {
  render: () => (
    <div className="w-[400px]">
      <BookList books={books} />
    </div>
  ),
};
