import { createSelector } from 'reselect';

export const selectRootWatches = (state: any) => {
    return state.watches;
};

export const selectWatches = createSelector(selectRootWatches, (state: any) => {
    return state.watches;
});

export const selectWatchesLength = createSelector(selectWatches, (watches) => {
    return watches.length;
});