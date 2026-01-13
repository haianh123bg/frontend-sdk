import { MoveLocation } from '../types';

export interface UseKanbanAiControlOptions {
    instanceId: string;
    moveItemLocal: (id: string, from: MoveLocation, to: MoveLocation, position: number) => void;
    updateItemLocal: (id: string, patch: any) => void;
    addItemLocal?: (item: Record<string, any>) => void;
    removeItemLocal?: (id: string) => void;
}
export declare const useKanbanAiControl: (options: UseKanbanAiControlOptions) => void;
