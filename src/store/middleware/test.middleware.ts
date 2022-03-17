//customized behavior for dispatch
export const print1 = (storeAPI: any) => (next: any) => (action:  any) => {
    console.log('1')
    return next(action);
};