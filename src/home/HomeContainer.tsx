import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { selectWatches } from '../store/watch/selectors';
import { fetchAllWatches } from '../store/watch/thunk';
import { Home } from './Home';

export const HomeContainer = (props: any) => {
    // const watchState = useWatchListing();
    const dispatch = useDispatch();
    const watches = useSelector(selectWatches);
    console.log(watches);
    

    useEffect(() => {
        dispatch(fetchAllWatches);
    }, []);

    return (
        <>hello</>
        // <Home {...props} data={watches} />
    )
}

export const HomeContainerWithPageContainer = WithPageContainer(HomeContainer);
