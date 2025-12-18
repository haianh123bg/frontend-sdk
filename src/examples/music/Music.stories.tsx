import type { Meta, StoryObj } from '@storybook/react';
import { MusicPlayer } from './MusicPlayer';
import { MusicCard } from './MusicCard';

const meta = {
  title: 'Examples/Music',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

export const Player: StoryObj<typeof MusicPlayer> = {
  render: () => (
    <MusicPlayer
      title="Midnight City"
      artist="M83"
      coverUrl="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop"
      isPlaying={true}
    />
  ),
};

export const Card: StoryObj<typeof MusicCard> = {
  render: () => (
    <div className="w-[200px]">
        <MusicCard
        id="1"
        title="Random Access Memories"
        artist="Daft Punk"
        albumCover="https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=300&auto=format&fit=crop"
        rating={5}
        duration="74 min"
        genre="Electronic"
        isLiked={true}
        />
    </div>
  ),
};
