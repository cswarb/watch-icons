import { createAction } from '../helpers/action.helper';

export const namespace = 'watches';

export const getAllWatches = `${namespace}/getAllWatches`;
export const getAllWatchesSuccess = `${namespace}/getAllWatchesSuccess`;
export const getAllWatchesError = `${namespace}/getAllWatchesError`;

export const getWatch = `${namespace}/getWatch`;

export const getWatchAction = { type: getWatch, payload: null };

export const getAllWatchesAction = { type: getAllWatches, payload: null };
export const getAllWatchesSuccessAction = { type: getAllWatches, payload: null };

// export const getWatchAction = createAction('watches/', (watchId: string) => {
//     return {
//         watchId
//     };
// });


// export const getAllWatchesAction = createAction('watches/');


