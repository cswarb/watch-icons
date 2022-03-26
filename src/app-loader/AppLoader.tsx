import classNames from 'classnames';
import { ServiceStatus } from '../store/watch/reducer';

export const AppLoader = ({ loaderState }: { loaderState: ServiceStatus }) => {
    const loading = (state: ServiceStatus) => state === ServiceStatus.FETCHING;
    const loaded = (state: ServiceStatus) => state === ServiceStatus.SUCCESS;

    return (
        <>
            <div className={`loader-container ${classNames({
                ['loader-container--loading']: loading(loaderState),
                ['loader-container--loaded']: loaded(loaderState),
            })}`}>
                <div className="loading-content">
                    <p className="loader">
                        Watch Icons
                    </p>

                    <div className="square"></div>
                </div>
            </div>
        </>
    )
}

export const WithAppLoader = (Hoc: any) => {
    return ({ loaderState, ...props }: { loaderState: ServiceStatus }) => {
        return (
            <>
                <AppLoader loaderState={ loaderState } />
                <Hoc {...props} />
            </>
        )
    }
};


