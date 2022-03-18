import { getAllWatches, getAllWatchesAction, getAllWatchesError, getAllWatchesSuccess, getWatch, getWatchAction } from './actions';
import { Map } from 'immutable';

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
    breakdown: {
        byId: Map<string, WatchReducerBreakdown>;
        allIds: Array<string>;
    },
    price: {
        byId: Map<string, WatchReducerPrice>;
        allIds: Array<string>;
    },
};

export interface WatchReducerWatch {
    _id: string;
    make: string;
    model: string;
    noteableModels: Array<string>;
    shortname: string;
    breakdowns: Array<string>;
    price: string;
}

export interface WatchReducerBreakdown {
    _id: string;
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
    breakdown: {
        byId: Map<string, WatchReducerBreakdown>(),
        allIds: []
    },
    price: {
        byId: Map<string, WatchReducerPrice>(),
        allIds: []
    }
};

export function watchReducer(state = defaultState, action: any) {
    console.log('action: ', action);
    switch (action.type) {
        case getAllWatches:
            return {
                ...state,
                status: ServiceStatus.FETCHING
            };
        case getAllWatchesSuccess: 
            const response = action.payload;
            return {
                ...state,
                status: ServiceStatus.SUCCESS,
                watches: {
                    byId: response.reduce((acc: any, w: any) => {
                        const { breakdown, price, ...watch } = w;
                        const g = {
                            ...watch,
                            breakdowns: breakdown.map((b: any) => b._id),
                            price: price._id
                        }
                        return acc.set(w._id, g);
                    }, Map()),
                    allIds: response.map((w: any) => w._id)
                },
                breakdown: {
                    byId: response.reduce((acc: Map<any, any>, w: any) => {
                        const brkdwn = w.breakdown.reduce((acc2: any, b: any) => {
                            return acc2.set(b._id, b);
                        }, Map());
                        return acc.concat(brkdwn);
                    }, Map()),
                    allIds: response.reduce((acc: Array<string>, w: any) => acc.concat(w.breakdown.map((b: any) => b._id)), [])
                },
                price: {
                    byId: response.reduce((acc: Map<any, any>, w: any) => {
                        return acc.set(w.price._id, w.price);
                    }, Map()),
                    allIds: response.reduce((acc: Array<string>, w: any) => acc.concat(w.price._id), [])
                },
            };
        case getAllWatchesError: 
            return {
                ...state,
                status: ServiceStatus.ERROR
            }
        case getWatch:
            return {
                ...state
            };
        default:
            return state;
    };
}