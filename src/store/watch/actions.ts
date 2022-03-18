import { createAction } from '../helpers/action.helper';

export const namespace = 'watches';

export const getAllWatches = `${namespace}/getAllWatches`;
export const getAllWatchesSuccess = `${namespace}/getAllWatchesSuccess`;
export const getAllWatchesError = `${namespace}/getAllWatchesError`;

export const getAllWatchesAction = { type: getAllWatches, payload: null };
export const getAllWatchesSuccessAction = { type: getAllWatches, payload: null };
export const getAllWatchesErrorAction = { type: getAllWatchesError, payload: null };

// export const getWatchAction = createAction('watches/', (watchId: string) => {
//     return {
//         watchId
//     };
// });


// export const getAllWatchesAction = createAction('watches/');


