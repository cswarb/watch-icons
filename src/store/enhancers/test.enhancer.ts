import { rootReducer } from '../reducer';

//Enhancers are powerful because they can override or replace any of the store's methods: dispatch, getState, and subscribe.
export const sayHiOnDispatch = (createStore: any): any => {
    return (rootReduce: any, preloadedState: any, enhancers: any) => {
        const store = createStore(rootReducer, preloadedState, enhancers);

        function newDispatch(action: any) {
            const result = store.dispatch(action)
            console.log('Hi!')
            return result
        }

        return { ...store, dispatch: newDispatch }
    }
}