import { createSelector } from 'reselect';
import { RootReducer } from '../reducer';

export const selectRootWatches = (state: RootReducer) => {
    return state.watches;
};

export const selectStatus = createSelector(selectRootWatches, (state) => {
    return state.status;
});

export const selectWatches = createSelector(selectRootWatches, (state) => {
    return state.watches;
});

export const selectNoteableModels = createSelector(selectRootWatches, (state) => {
    return state.noteableModels;
});

export const selectBreakdowns = createSelector(selectRootWatches, (state) => {
    return state.breakdowns;
});

export const selectAllBreakdownIds = createSelector(selectBreakdowns, (breakdowns) => {
    return breakdowns.allIds;
});

export const selectBreakdownsById = createSelector(selectBreakdowns, (breakdowns) => {
    return breakdowns.byId;
});

export const selectPrices = createSelector(selectRootWatches, (state) => {
    return state.prices;
});

export const selectPricesById = createSelector(selectPrices, (prices) => {
    return prices.byId;
});

export const selectAllPriceIds = createSelector(selectPrices, (prices) => {
    return prices.allIds;
});

export const selectAllWatchesIds = createSelector(selectWatches, (watches) => {
    return watches.allIds;
});

export const selectWatchesById = createSelector(selectWatches, (watches) => {
    return watches.byId;
});

export const selectAllNoteableModelIds = createSelector(selectNoteableModels, (watches) => {
    return watches.allIds;
});

export const selectNoteableModelsById = createSelector(selectNoteableModels, (watches) => {
    return watches.byId;
});

export const selectWatchById: any = createSelector(
    selectWatchesById,
    (state: any, watchId: string) => watchId,
    (watches, watchId) => {
        return watches.get(watchId);
    }
);

export const selectPriceById: any = createSelector(
    selectPricesById,
    (state: any, priceId: string) => priceId,
    (prices, priceId) => {
        return prices.get(priceId);
    }
);

export const selectDerivedBreakdownsById: any = createSelector(
    selectBreakdownsById,
    (state: any, breakdownIds: Array<string>) => breakdownIds,
    (breakdowns, breakdownIds) => {
        return breakdownIds.map(b => breakdowns.get(b));
    }
);

export const selectDerivedNoteableModelsById: any = createSelector(
    selectNoteableModelsById,
    (state: any, modelIds: Array<string>) => modelIds,
    (breakdowns, modelIds) => {
        return modelIds.map(b => breakdowns.get(b));
    }
);
