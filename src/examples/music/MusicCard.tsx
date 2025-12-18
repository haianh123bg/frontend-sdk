import { Heart, MoreHorizontal, PlayCircle } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Button } from '../../components/atoms/Button/Button';
import { Image } from '../../components/atoms/Image/Image';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Badge } from '../../components/atoms/Badge/Badge';
import { Rating } from '../../components/atoms/Rating/Rating';
import { Text, Title, Caption } from '../../components/atoms/TypographyPrimitives';

export interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  rating?: number;
  duration?: string;
  genre?: string;
  isLiked?: boolean;
  onPlay?: () => void;
  onLike?: () => void;
  onMenu?: () => void;
  className?: string;
}

export const MusicCard = ({
  title,
  artist,
  albumCover,
  rating = 0,
  duration,
  genre,
  isLiked = false,
  onPlay,
  onLike,
  onMenu,
  className,
}: MusicCardProps) => {
  return (
    <Card
      className={className}
      padding="none"
      media={
        <div className="relative group aspect-square w-full overflow-hidden">
          <Image
            src={albumCover}
            alt={title}
            aspectRatio="1/1"
            className="rounded-none w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="primary"
              size="lg"
              className="rounded-full w-12 h-12 p-0 shadow-xl scale-90 group-hover:scale-100 transition-all duration-300"
              onClick={onPlay}
            >
               <Icon icon={PlayCircle} size="lg" className="ml-0.5" />
            </Button>
          </div>
          {genre && (
            <div className="absolute top-2 left-2">
               <Badge variant="primary" size="sm" className="shadow-sm backdrop-blur-md bg-white/90 dark:bg-black/80">
                  {genre}
               </Badge>
            </div>
          )}
        </div>
      }
    >
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1 min-w-0 flex-1">
            <Title className="text-lg leading-tight truncate" title={title}>{title}</Title>
            <Text className="text-sm text-text-secondary truncate">{artist}</Text>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full shrink-0" onClick={onMenu}>
            <Icon icon={MoreHorizontal} size="md" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
            <Rating value={rating} readOnly size="sm" max={5} />
            {duration && <Caption>{duration}</Caption>}
        </div>

        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
           <Button 
             variant={isLiked ? "danger" : "ghost"} 
             size="sm" 
             className={`gap-1.5 px-0 ${isLiked ? 'bg-transparent hover:bg-transparent text-red-500' : 'text-text-muted hover:text-red-500'}`}
             onClick={onLike}
           >
             <Icon icon={Heart} size="sm" className={isLiked ? "fill-current" : ""} />
             <span className="text-xs font-medium">{isLiked ? 'Liked' : 'Like'}</span>
           </Button>
           <Button variant="ghost" size="sm" className="text-xs text-primary-600 hover:text-primary-700 font-medium px-0 hover:bg-transparent">
             View Album
           </Button>
        </div>
      </div>
    </Card>
  );
};
