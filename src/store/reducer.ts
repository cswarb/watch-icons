import { combineReducers } from 'redux';
import { watchReducer } from './watch/reducer';

export const rootReducer = combineReducers({
    watches: watchReducer,
});
