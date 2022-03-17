import { useState, useEffect } from 'react';
import { Watch } from '../watch/watch.hook';

export function useWatchListing() {
    const [watchState, setWatchState] = useState<Array<Watch>>([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/watches', {
            method: 'GET'
        })
        .then(res => res.json())
        .then((res: Array<Watch>) => {
            setWatchState(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return watchState;
};
