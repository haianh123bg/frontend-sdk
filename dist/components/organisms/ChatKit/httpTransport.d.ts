import { ChatTransport } from './transport';

export type HttpChatTransportOptions = {
    endpoints: {
        sendMessage: string;
        sendAction: string;
        loadOlder?: string;
    };
    baseUrl?: string;
    fetcher?: typeof fetch;
    getAuthHeaders?: () => Promise<Record<string, string>> | Record<string, string>;
    headers?: Record<string, string>;
};
export declare function createHttpChatTransport(options: HttpChatTransportOptions): ChatTransport;
