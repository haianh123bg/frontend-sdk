import { Play, Pause, SkipBack, SkipForward, Heart } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Button } from '../../components/atoms/Button/Button';
import { Slider } from '../../components/atoms/Slider/Slider';
import { Image } from '../../components/atoms/Image/Image';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Caption } from '../../components/atoms/TypographyPrimitives';

export interface MusicPlayerProps {
  title: string;
  artist: string;
  coverUrl: string;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  className?: string;
}

export const MusicPlayer = ({
  title,
  artist,
  coverUrl,
  isPlaying = false,
  onPlayPause,
  onNext,
  onPrev,
  className,
}: MusicPlayerProps) => {
  return (
    <Card
      className={className}
      media={
        <div className="relative group w-full h-full">
          <Image
            src={coverUrl}
            alt={title}
            aspectRatio="1/1"
            className="rounded-none w-full h-full" 
          />
           <Button 
              variant="secondary" 
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-8 h-8 p-0 z-10 flex items-center justify-center"
              onClick={() => console.log('Like')}
            >
              <Icon icon={Heart} size="sm" />
            </Button>
        </div>
      }
      title={title}
      subtitle={artist}
      padding="lg"
    >
      <div className="space-y-6 mt-2">
        <Slider 
          defaultValue={33} 
          max={100} 
          variant="default"
          showValue={false}
          className="w-full"
        />
        
        <div className="flex items-center justify-between">
            <Caption>1:23</Caption>
             <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={onPrev} className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                    <Icon icon={SkipBack} size="md" />
                </Button>
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={onPlayPause}
                  className="rounded-full w-14 h-14 p-0 shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
                >
                    <Icon icon={isPlaying ? Pause : Play} size="lg" className="text-white fill-current" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onNext} className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                    <Icon icon={SkipForward} size="md" />
                </Button>
             </div>
            <Caption>3:45</Caption>
        </div>
      </div>
    </Card>
  );
};
