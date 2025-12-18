import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { PostCard } from './PostCard';

const meta = {
  title: 'Examples/Social',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

export const UserProfile: StoryObj<typeof ProfileCard> = {
  render: () => (
    <div className="w-[380px]">
      <ProfileCard
        name="Sarah Jenkins"
        handle="sarahj_design"
        bio="Product Designer at TechFlow. Passionate about UI/UX and accessibility. Coffee lover ☕️"
        avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
        coverUrl="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop"
        location="San Francisco, CA"
        website="sarah.design"
        stats={{
          followers: 12500,
          following: 890,
          posts: 342
        }}
        isFollowing={false}
      />
    </div>
  ),
};

export const SocialPost: StoryObj<typeof PostCard> = {
  render: () => (
    <div className="w-[500px]">
      <PostCard
        id="1"
        author={{
          name: "Alex Morgan",
          handle: "amorgan",
          avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop"
        }}
        content="Just launched our new design system! 🚀 It's been a long journey but super excited to see it live. Check out the documentation below."
        mediaUrl="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop"
        timestamp="2h ago"
        stats={{
          likes: 245,
          comments: 42,
          shares: 12
        }}
        isLiked={true}
        isBookmarked={false}
      />
    </div>
  ),
};
