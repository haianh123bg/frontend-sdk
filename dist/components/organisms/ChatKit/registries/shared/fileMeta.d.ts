export type FileMeta = {
    name: string;
    size: number;
    type: string;
    lastModified: number;
};
export declare function toFileMeta(file: File): FileMeta;
