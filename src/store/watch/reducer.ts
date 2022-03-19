import { getAllWatches, getAllWatchesError, getAllWatchesSuccess } from './actions';
import { Map } from 'immutable';
import { WatchResponse } from '../domain/watch.domain';

export enum ServiceStatus {
    NEW = 'NEW',
    FETCHING = 'FETCHING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
};

export interface WatchReducer {
    status: ServiceStatus;
    watches: {
        byId: Map<string, WatchReducerWatch>;
        allIds: Array<string>;
    },
    breakdowns: {
        byId: Map<string, WatchReducerBreakdown>;
        allIds: Array<string>;
    },
    prices: {
        byId: Map<string, WatchReducerPrice>;
        allIds: Array<string>;
    },
    noteableModels: {
        byId: Map<string, WatchReducerNoteableModels>;
        allIds: Array<string>;
    },
};

export interface WatchReducerWatch {
    _id: string;
    make: string;
    model: string;
    noteableModelIds: Array<string>;
    shortname: string;
    breakdownIds: Array<string>;
    priceId: string;
}

export interface WatchReducerNoteableModels {
    _id: string;
    title: string;
    date: Date;
    description: string;
}

export interface WatchReducerBreakdown {
    _id: string;
    title: string;
    description: string;
}

export interface WatchReducerPrice {
    _id: string;
    from: string;
    to: string;
}

const defaultState = {
    status: ServiceStatus.NEW,
    watches: {
        byId: Map<string, WatchReducerWatch>(),
        allIds: []
    },
    breakdowns: {
        byId: Map<string, WatchReducerBreakdown>(),
        allIds: []
    },
    prices: {
        byId: Map<string, WatchReducerPrice>(),
        allIds: []
    },
    noteableModels: {
        byId: Map<string, WatchReducerNoteableModels>(),
        allIds: []
    }
};

export function watchReducer(state = defaultState, action: any) {
    switch (action.type) {
        case getAllWatches:
            return {
                ...state,
                status: ServiceStatus.FETCHING
            };
        case getAllWatchesSuccess: 
            const response: Array<WatchResponse> = action.payload;

            return {
                ...state,
                status: ServiceStatus.SUCCESS,
                watches: {
                    byId: response.reduce((acc: Map<string, WatchReducerWatch>, w: WatchResponse) => {
                        const { breakdown, price, noteableModels, ...watch } = w;
                        const g = {
                            ...watch,
                            breakdownIds: breakdown.map((b: any) => b._id),
                            priceId: price._id,
                            noteableModelIds: noteableModels.map((n: any) => n._id)
                        };

                        return acc.set(w._id, g);
                    }, Map()),
                    allIds: response.map((w: WatchResponse) => w._id)
                },
                breakdowns: {
                    byId: response.reduce((acc: Map<string, WatchReducerBreakdown>, w: WatchResponse) => {
                        const breakdown: Map<string, WatchReducerBreakdown> = w.breakdown.reduce((acc2: any, b: any) => {
                            return acc2.set(b._id, b);
                        }, Map());
                        return acc.concat(breakdown);
                    }, Map()),
                    allIds: response.reduce((acc: Array<string>, w: WatchResponse) => acc.concat(w.breakdown.map((b: any) => b._id)), [])
                },
                prices: {
                    byId: response.reduce((acc: Map<string, WatchReducerPrice>, w: WatchResponse) => {
                        return acc.set(w.price._id, w.price);
                    }, Map()),
                    allIds: response.reduce((acc: Array<string>, w: WatchResponse) => acc.concat(w.price._id), [])
                },
                noteableModels: {
                    byId: response.reduce((acc: Map<string, WatchReducerNoteableModels>, w: WatchResponse) => {
                        const noteableModels: Map<string, WatchReducerNoteableModels> = w.noteableModels.reduce((acc2: any, n: WatchReducerNoteableModels) => {
                            return acc2.set(n._id, n);
                        }, Map());
                        return acc.concat(noteableModels);
                    }, Map()),
                    allIds: response.reduce((acc: Array<string>, w: WatchResponse) => acc.concat(w.noteableModels.map((n: any) => n._id)), [])
                }
            };
        case getAllWatchesError: 
            return {
                ...state,
                status: ServiceStatus.ERROR
            }
        default:
            return state;
    };
}