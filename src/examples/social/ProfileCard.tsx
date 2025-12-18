import { MapPin, Link as LinkIcon } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Avatar } from '../../components/atoms/Avatar/Avatar';
import { Button } from '../../components/atoms/Button/Button';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Heading } from '../../components/atoms/Heading/Heading';
import { Text, Caption } from '../../components/atoms/TypographyPrimitives';

export interface ProfileCardProps {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  coverUrl?: string;
  location?: string;
  website?: string;
  stats: {
    followers: number;
    following: number;
    posts: number;
  };
  isFollowing?: boolean;
  onFollow?: () => void;
  className?: string;
}

export const ProfileCard = ({
  name,
  handle,
  bio,
  avatarUrl,
  coverUrl,
  location,
  website,
  stats,
  isFollowing = false,
  onFollow,
  className,
}: ProfileCardProps) => {
  return (
    <Card className={className} padding="none">
      <div className="relative h-32 bg-slate-100 dark:bg-zinc-800">
        {coverUrl && (
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
        )}
      </div>
      
      <div className="px-6 pb-6 relative">
        <div className="flex justify-between items-end -mt-10 mb-4">
           <div className="p-1 bg-white dark:bg-zinc-900 rounded-full">
             <Avatar src={avatarUrl} alt={name} size="xl" className="w-20 h-20 border-4 border-white dark:border-zinc-900" />
           </div>
           <Button 
             variant={isFollowing ? 'secondary' : 'primary'} 
             onClick={onFollow}
             className="mb-2"
           >
             {isFollowing ? 'Following' : 'Follow'}
           </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Heading as="h3" size="lg">{name}</Heading>
            <Text className="text-text-secondary">@{handle}</Text>
          </div>
          
          <Text>{bio}</Text>
          
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            {location && (
              <div className="flex items-center gap-1">
                <Icon icon={MapPin} size="xs" />
                <span>{location}</span>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-1">
                <Icon icon={LinkIcon} size="xs" />
                <a href={`https://${website}`} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">{website}</a>
              </div>
            )}
          </div>

          <div className="flex gap-6 pt-2 border-t border-zinc-100 dark:border-zinc-800">
             <div className="flex flex-col">
               <span className="font-bold text-lg">{stats.followers.toLocaleString()}</span>
               <Caption>Followers</Caption>
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-lg">{stats.following.toLocaleString()}</span>
               <Caption>Following</Caption>
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-lg">{stats.posts.toLocaleString()}</span>
               <Caption>Posts</Caption>
             </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
