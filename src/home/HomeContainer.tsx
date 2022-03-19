import { useSelector } from 'react-redux';
import { WithDynamicBackground } from '../shared/dynamic-background/DynamicBackground';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { Spinner } from '../shared/spinner/spinner';
import { selectAllWatchesIds } from '../store/watch/selectors';
import { Home } from './Home';

export const HomeContainer = (props: any) => {
    const watchIds = useSelector(selectAllWatchesIds);

    return (
        <WithDynamicBackground>
            {!watchIds || (watchIds && watchIds.length < 1) ? <Spinner /> : <Home {...props} watchIds={watchIds} />}
        </WithDynamicBackground>
    )
}

export const HomeContainerWithPageContainer = WithPageContainer(HomeContainer);
