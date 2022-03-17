import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import { sayHiOnDispatch } from './enhancers/test.enhancer';
import { print1 } from './middleware/test.middleware';
import thunkMiddleware from 'redux-thunk';

const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunkMiddleware, print1),
    sayHiOnDispatch,
);

const preloadedState: any = {};

export const store = createStore(rootReducer, preloadedState, composedEnhancer);
