import { useState, useEffect } from 'react';
import { WatchData } from '../watch/watch.hook';

export function useWatchListing() {
    const [watchState, setWatchState] = useState<Array<WatchData>>([]);

    useEffect(() => {
        fetch('//localhost:3030/api/watches', {
            method: 'GET'
        })
        .then(res => res.json())
        .then((res: Array<WatchData>) => {
            setWatchState(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return watchState;
};
