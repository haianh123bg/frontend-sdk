import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Icon, IconVariant } from '../../components/atoms/Icon/Icon';
import { Heading } from '../../components/atoms/Heading/Heading';
import { Caption } from '../../components/atoms/TypographyPrimitives';
import { Badge } from '../../components/atoms/Badge/Badge';

export interface StatCardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  icon: LucideIcon;
  iconColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const StatCard = ({
  title,
  value,
  trend,
  icon,
  iconColor = 'primary',
  className,
}: StatCardProps) => {
  const mapColorToVariant = (color: string): IconVariant => {
      if (color === 'danger') return 'error';
      return color as IconVariant;
  }

  return (
    <Card className={className} padding="md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <Caption className="font-medium text-text-secondary">{title}</Caption>
          <Heading as="h4" size="xl" className="font-bold tracking-tight">{value}</Heading>
        </div>
        <div className={`p-2 rounded-lg bg-${iconColor === 'primary' ? 'primary' : iconColor}-50 text-${iconColor === 'primary' ? 'primary' : iconColor}-600`}>
          <Icon icon={icon} size="md" variant={mapColorToVariant(iconColor)} />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <Badge 
            variant={trend.isPositive ? 'success' : 'danger'} 
            size="sm" 
            className="gap-1 font-medium"
          >
            <Icon icon={trend.isPositive ? ArrowUpRight : ArrowDownRight} size="xs" />
            {Math.abs(trend.value)}%
          </Badge>
          <Caption className="text-text-muted">{trend.label}</Caption>
        </div>
      )}
    </Card>
  );
};
