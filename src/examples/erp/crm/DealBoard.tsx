import { MoreHorizontal, Plus, Calendar } from 'lucide-react';
import { Text, Caption } from '../../../components/atoms/TypographyPrimitives';
import { Heading } from '../../../components/atoms/Heading/Heading';
import { Badge } from '../../../components/atoms/Badge/Badge';
import { Avatar, AvatarGroup } from '../../../components/atoms/Avatar/Avatar';
import { Button } from '../../../components/atoms/Button/Button';
import { Icon } from '../../../components/atoms/Icon/Icon';
import { Progress } from '../../../components/atoms/Progress/Progress';

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  assignees: string[];
  closingDate: string;
  tags?: string[];
}

const columns = [
  { id: 'new', title: 'New Leads', color: 'border-blue-500' },
  { id: 'qualification', title: 'Qualification', color: 'border-yellow-500' },
  { id: 'negotiation', title: 'Negotiation', color: 'border-purple-500' },
  { id: 'won', title: 'Won', color: 'border-green-500' },
];

const deals: Record<string, Deal[]> = {
  new: [
    { id: '1', title: 'Enterprise License', company: 'TechCorp', value: 25000, probability: 20, assignees: ['A'], closingDate: '2024-04-15', tags: ['SaaS'] },
    { id: '2', title: 'Consulting Project', company: 'StartUp Inc', value: 5000, probability: 10, assignees: ['B'], closingDate: '2024-04-20' },
  ],
  qualification: [
    { id: '3', title: 'Global Expansion', company: 'MegaGroup', value: 120000, probability: 40, assignees: ['A', 'C'], closingDate: '2024-05-01', tags: ['Strategic'] },
  ],
  negotiation: [
    { id: '4', title: 'Annual Contract', company: 'RetailChain', value: 45000, probability: 80, assignees: ['B'], closingDate: '2024-03-30' },
  ],
  won: [
     { id: '5', title: 'Pilot Program', company: 'EduTech', value: 10000, probability: 100, assignees: ['C'], closingDate: '2024-03-10' },
  ]
};

const DealCard = ({ deal }: { deal: Deal }) => (
  <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex justify-between items-start mb-2">
      <div>
        <Text className="font-semibold text-sm line-clamp-1" title={deal.title}>{deal.title}</Text>
        <Caption className="text-text-secondary">{deal.company}</Caption>
      </div>
      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-text-muted">
        <Icon icon={MoreHorizontal} size="xs" />
      </Button>
    </div>
    
    <div className="flex items-center gap-1 mb-3">
        <Badge variant="default" size="sm" className="bg-slate-100 text-slate-600 font-medium">
             ${deal.value.toLocaleString()}
        </Badge>
        {deal.tags?.map(tag => (
            <Badge key={tag} variant="info" size="sm" className="bg-blue-50 text-blue-600 border-none">{tag}</Badge>
        ))}
    </div>

    <div className="space-y-1 mb-3">
        <div className="flex justify-between text-[10px] text-text-secondary">
            <span>Probability</span>
            <span>{deal.probability}%</span>
        </div>
        <Progress value={deal.probability} max={100} size="sm" variant={deal.probability > 70 ? 'success' : deal.probability > 30 ? 'primary' : 'secondary'} className="h-1.5" />
    </div>

    <div className="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-700/50">
       <div className="flex items-center gap-1 text-[10px] text-text-muted">
          <Icon icon={Calendar} size="xs" />
          <span>{new Date(deal.closingDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
       </div>
       <AvatarGroup max={2} className="-space-x-2">
           {deal.assignees.map(a => (
               <Avatar key={a} initials={a} size="sm" className="w-6 h-6 text-[10px] border-2 border-white dark:border-zinc-800" />
           ))}
       </AvatarGroup>
    </div>
  </div>
);

export const DealBoard = () => {
  return (
    <div className="flex h-full gap-4 overflow-x-auto p-4 bg-slate-50 dark:bg-zinc-900/50 min-h-[500px]">
      {columns.map(col => (
        <div key={col.id} className="flex-shrink-0 w-72 flex flex-col gap-3">
          <div className={`flex items-center justify-between pb-2 border-b-2 ${col.color}`}>
             <Heading as="h4" size="sm" className="uppercase tracking-wider text-text-secondary">{col.title}</Heading>
             <Badge variant="default" size="sm" className="rounded-full px-2">{deals[col.id]?.length || 0}</Badge>
          </div>
          
          <div className="flex flex-col gap-3 flex-1">
             {deals[col.id]?.map(deal => (
                 <DealCard key={deal.id} deal={deal} />
             ))}
             <Button variant="ghost" className="border border-dashed border-zinc-300 dark:border-zinc-700 text-text-muted hover:border-primary-500 hover:text-primary-500">
                 <Icon icon={Plus} size="sm" className="mr-1" />
                 Add Deal
             </Button>
          </div>
          
          <div className="mt-auto pt-2 text-right">
             <Text className="text-xs font-medium text-text-secondary">
                 Total: ${deals[col.id]?.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
             </Text>
          </div>
        </div>
      ))}
    </div>
  );
};
