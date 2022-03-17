interface Action {
    type: string;
    payload?: any;
}


export const createAction = (type: string, callback?: (data: any) => any): any => {
    return (payload: any): Action => {
        return {
            type,
            payload: callback && callback(payload)
        }
    }
};
