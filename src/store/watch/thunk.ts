import { getAllWatches, getAllWatchesError, getAllWatchesSuccess } from './actions';

//'effects'
export async function fetchAllWatches(dispatch: any, getState: any) {
    dispatch({ type: getAllWatches });
    
    setTimeout(async () => {
        try {
            const response = await fetch('//localhost:3030/api/watches', {
                method: 'GET'
            }).then(res => res.json());

            dispatch({ type: getAllWatchesSuccess, payload: response });
        } catch (error) {
            dispatch({ type: getAllWatchesError });
        };
    }, 1500);
}
