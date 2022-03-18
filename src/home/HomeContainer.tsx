import { useSelector } from 'react-redux';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { Spinner } from '../shared/spinner/spinner';
import { selectAllWatchesIds } from '../store/watch/selectors';
import { Home } from './Home';

export const HomeContainer = (props: any) => {
    const watchIds = useSelector(selectAllWatchesIds);

    return (
        !watchIds || (watchIds && watchIds.length < 1) ? <Spinner /> : <Home {...props} watchIds={watchIds} />
    )
}

export const HomeContainerWithPageContainer = WithPageContainer(HomeContainer);
