import { LoadingState } from './model';
import classNames from 'classnames';

export const AppLoader = ({ loaderState }: { loaderState: LoadingState }) => {
    return (
        <>
            <div className="logo">
                Watch Icons
            </div>

            <div className={`loader ${classNames({
                    ['loader--loading']: loaderState === LoadingState.LOADING,
                    ['loader--loaded']: loaderState === LoadingState.LOADED,
                })}`}>
                
                <div className="loader__column">

                </div>

                <div className="loader__column">

                </div>

                <div className="loader__column">

                </div>

                <div className="loader__column">

                </div>
            </div>
        </>
    )
}

export const WithAppLoader = (Hoc: any) => {
    return ({ loaderState, ...props }: { loaderState: LoadingState }) => {
        return (
            loaderState !== LoadingState.LOADED ? <AppLoader loaderState={ loaderState } /> : <Hoc {...props} />
        )
    }
};


