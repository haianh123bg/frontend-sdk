import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Avatar } from '../../components/atoms/Avatar/Avatar';
import { Button } from '../../components/atoms/Button/Button';
import { Image } from '../../components/atoms/Image/Image';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Text, Caption } from '../../components/atoms/TypographyPrimitives';

export interface PostCardProps {
  id: string;
  author: {
    name: string;
    handle: string;
    avatarUrl: string;
  };
  content: string;
  mediaUrl?: string;
  timestamp: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  className?: string;
}

export const PostCard = ({
  author,
  content,
  mediaUrl,
  timestamp,
  stats,
  isLiked,
  isBookmarked,
  onLike,
  onComment,
  onShare,
  onBookmark,
  className,
}: PostCardProps) => {
  return (
    <Card className={className} padding="md">
      <div className="flex gap-3">
        <Avatar src={author.avatarUrl} alt={author.name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <Text className="font-bold truncate">{author.name}</Text>
              <Caption className="truncate">@{author.handle} · {timestamp}</Caption>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 -mr-2 text-text-muted">
              <Icon icon={MoreHorizontal} size="sm" />
            </Button>
          </div>
          
          <div className="mt-1 space-y-3">
            <Text className="whitespace-pre-wrap">{content}</Text>
            
            {mediaUrl && (
              <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                <Image src={mediaUrl} alt="Post media" className="w-full h-auto max-h-96 object-cover rounded-none" />
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 -ml-2 text-text-secondary">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 hover:text-primary-500 hover:bg-primary-50"
                onClick={onComment}
              >
                <Icon icon={MessageCircle} size="sm" />
                <span className="text-xs">{stats.comments}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`gap-2 ${isLiked ? 'text-red-500 hover:text-red-600 hover:bg-red-50' : 'hover:text-red-500 hover:bg-red-50'}`}
                onClick={onLike}
              >
                <Icon icon={Heart} size="sm" className={isLiked ? "fill-current" : ""} />
                <span className="text-xs">{stats.likes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 hover:text-green-500 hover:bg-green-50"
                onClick={onShare}
              >
                <Icon icon={Share2} size="sm" />
                <span className="text-xs">{stats.shares}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 w-8 p-0 ${isBookmarked ? 'text-primary-500' : 'hover:text-primary-500'}`}
                onClick={onBookmark}
              >
                <Icon icon={Bookmark} size="sm" className={isBookmarked ? "fill-current" : ""} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
