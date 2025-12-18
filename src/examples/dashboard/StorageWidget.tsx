import { Cloud } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Progress } from '../../components/atoms/Progress/Progress';
import { Button } from '../../components/atoms/Button/Button';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Heading } from '../../components/atoms/Heading/Heading';
import { Text, Caption } from '../../components/atoms/TypographyPrimitives';

export interface StorageWidgetProps {
  used: number; // in GB
  total: number; // in GB
  breakdown?: {
    documents: number;
    media: number;
    other: number;
  };
  className?: string;
}

export const StorageWidget = ({
  used,
  total,
  breakdown,
  className,
}: StorageWidgetProps) => {
  const percentage = Math.round((used / total) * 100);
  
  return (
    <Card className={className} padding="lg">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary-50 text-primary-600">
            <Icon icon={Cloud} size="lg" />
          </div>
          <div>
            <Heading as="h3" size="md">Cloud Storage</Heading>
            <Text className="text-sm text-text-secondary">Standard Plan</Text>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <Text className="font-bold text-2xl">{used} <span className="text-base font-normal text-text-muted">GB</span></Text>
            <Caption className="font-medium">{percentage}% used of {total} GB</Caption>
          </div>
          <Progress value={percentage} max={100} variant={percentage > 90 ? 'danger' : 'primary'} size="lg" />
        </div>

        {breakdown && (
            <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="space-y-1">
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <Caption>Docs</Caption>
                   </div>
                   <Text className="font-medium text-xs">{breakdown.documents} GB</Text>
                </div>
                <div className="space-y-1">
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <Caption>Media</Caption>
                   </div>
                   <Text className="font-medium text-xs">{breakdown.media} GB</Text>
                </div>
                <div className="space-y-1">
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                      <Caption>Other</Caption>
                   </div>
                   <Text className="font-medium text-xs">{breakdown.other} GB</Text>
                </div>
            </div>
        )}

        <Button variant="secondary" fullWidth>Upgrade Storage</Button>
      </div>
    </Card>
  );
};
