import { getAllWatches, getAllWatchesAction, getAllWatchesSuccess, getWatch, getWatchAction } from './actions';

const defaultState = {
    watches: []
};

export function watchReducer(state = defaultState, action: any) {
    console.log('action: ', action);
    switch (action.type) {
        case getAllWatches:
            return {
                ...state
            };
        case getAllWatchesSuccess: 
            const g = action;
            return {
                ...state,
                watches: g.payload
            };
        case getWatch:
            return {
                ...state
            };
        default:
            return state;
    };
}