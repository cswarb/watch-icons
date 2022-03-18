import { combineReducers } from 'redux';
import { WatchReducer, watchReducer } from './watch/reducer';

export interface RootReducer {
    watches: WatchReducer;
};

export const rootReducer = combineReducers({
    watches: watchReducer,
});
