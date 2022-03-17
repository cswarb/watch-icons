import { useState, useEffect } from 'react';

export interface Watch {
    breakdown: Array<{ description: string, _id: string }>;
    make: string;
    model: string;
    noteableModels: Array<string>;
    price: { 
        from: string, 
        to: string, 
        _id: string
    }
    shortname: string;
    _id: string;
}

export function useWatch(watchId: string | undefined) {
    const [watchState, setWatchState] = useState<Watch | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3030/api/watches/watch/${watchId}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((res: Watch) => {
            setWatchState(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [watchId]);

    return watchState;
};