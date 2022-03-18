export interface WatchResponse {
    breakdown: Array<{ _id: string, title: string, description: string }>;
    make: string;
    model: string;
    noteableModels: Array<{ _id: string, title: string, date: Date, description: string }>;
    price: {
        from: string,
        to: string,
        _id: string
    }
    shortname: string;
    _id: string;
};
