import { JsonPatchOperation } from './contracts';

export declare function applyJsonPatch<T>(doc: T, ops: JsonPatchOperation[]): T;
