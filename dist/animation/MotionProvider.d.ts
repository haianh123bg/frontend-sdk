import { LazyMotion } from 'framer-motion';
import * as React from 'react';
export interface MotionProviderProps {
    children: React.ReactNode;
    /**
     * Custom feature bundle cho LazyMotion. Dùng domAnimation mặc định để giữ bundle size nhỏ nhất.
     * Có thể truyền domMax (layout animation) khi cần.
     */
    features?: Parameters<typeof LazyMotion>[0]['features'];
    strict?: boolean;
}
export declare const MotionProvider: React.FC<MotionProviderProps>;
