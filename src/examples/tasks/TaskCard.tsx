import { Calendar, MoreVertical, Paperclip } from 'lucide-react';
import { Card } from '../../components/atoms/Card/Card';
import { Checkbox } from '../../components/atoms/Checkbox/Checkbox';
import { Badge } from '../../components/atoms/Badge/Badge';
import { AvatarGroup, Avatar } from '../../components/atoms/Avatar/Avatar';
import { Button } from '../../components/atoms/Button/Button';
import { Icon } from '../../components/atoms/Icon/Icon';
import { Text } from '../../components/atoms/TypographyPrimitives';

export interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
  assignees?: { name: string; avatarUrl: string }[];
  attachmentCount?: number;
  onToggle?: () => void;
  className?: string;
}

export const TaskCard = ({
  title,
  description,
  isCompleted,
  dueDate,
  priority,
  tags,
  assignees,
  attachmentCount,
  onToggle,
  className,
}: TaskCardProps) => {
  const priorityColors = {
    low: 'success',
    medium: 'warning',
    high: 'danger',
  } as const;

  return (
    <Card 
      className={`transition-all hover:shadow-md hover:border-primary-200 ${className} ${isCompleted ? 'opacity-75 bg-slate-50' : ''}`} 
      padding="md"
    >
      <div className="flex items-start gap-3">
        <Checkbox 
          checked={isCompleted} 
          onChange={onToggle} 
          className="mt-1"
        />
        
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Text className={`font-medium ${isCompleted ? 'line-through text-text-secondary' : 'text-text-primary'}`}>
                {title}
              </Text>
              {description && !isCompleted && (
                <Text className="text-sm text-text-secondary line-clamp-2">{description}</Text>
              )}
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 -mr-2 text-text-muted">
                <Icon icon={MoreVertical} size="xs" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant={priorityColors[priority]} size="sm" className="uppercase text-[10px] tracking-wider">
              {priority}
            </Badge>
            {tags?.map(tag => (
              <Badge key={tag} variant="default" size="sm" className="text-text-secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              {dueDate && (
                <div className={`flex items-center gap-1.5 text-xs ${new Date(dueDate) < new Date() && !isCompleted ? 'text-red-500 font-medium' : 'text-text-muted'}`}>
                  <Icon icon={Calendar} size="xs" />
                  <span>{new Date(dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                </div>
              )}
              {attachmentCount && attachmentCount > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Icon icon={Paperclip} size="xs" />
                  <span>{attachmentCount}</span>
                </div>
              )}
            </div>

            {assignees && (
              <AvatarGroup max={3}>
                {assignees.map((user, idx) => (
                  <Avatar key={idx} src={user.avatarUrl} alt={user.name} size="sm" />
                ))}
              </AvatarGroup>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
