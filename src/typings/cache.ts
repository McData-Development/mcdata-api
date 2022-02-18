export interface PlayerCache {
    id: string;
    name: string;
    history: Array<HistoryCache>;
    last_fetched: Date;
}

export interface HistoryCache {
    name: string;
    changedToAt?: number;
}