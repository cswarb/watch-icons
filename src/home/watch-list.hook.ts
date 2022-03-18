import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllWatches } from '../store/watch/thunk';

export function useWatchListing() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchAllWatches);
    }, []);
};
