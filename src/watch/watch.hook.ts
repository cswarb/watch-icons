import { useState, useEffect } from 'react';
import { WatchResponse } from '../store/domain/watch.domain';

export function useWatch(watchId: string | undefined) {
    const [watchState, setWatchState] = useState<WatchResponse | null>(null);

    useEffect(() => {
        fetch(`//localhost:3030/api/watches/watch/${watchId}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((res: WatchResponse) => {
            setWatchState(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [watchId]);

    return watchState;
};
