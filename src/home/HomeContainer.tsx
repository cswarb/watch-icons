import { WithPageContainer } from '../shared/page-container/PageContainer';
import { Home } from './Home';
import { useWatchListing } from './watch-list.hook';

export const HomeContainer = (props: any) => {
    const watchState = useWatchListing();

    return (
        <Home {...props} data={watchState} />
    )
}

export const HomeContainerWithPageContainer = WithPageContainer(HomeContainer);
