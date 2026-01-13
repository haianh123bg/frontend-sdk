import { RefObject } from 'react';
import { Editor } from '@tiptap/react';

export interface NotionBlockToolbarProps {
    editor: Editor | null;
    containerRef: RefObject<HTMLElement>;
}
export declare function NotionBlockToolbar({ editor, containerRef }: NotionBlockToolbarProps): import("react/jsx-runtime").JSX.Element | null;
