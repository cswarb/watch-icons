import { useParams } from 'react-router-dom';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { Spinner } from '../shared/spinner/spinner';
import { Watch } from './Watch';
import { useWatch } from './watch.hook';

export const WatchContainer = (props: any) => {
    const { watchId } = useParams();
    const watchData = useWatch(watchId?.toString());

    return !watchData ? <Spinner /> : 
    <>
        <Watch {...props} watch={watchData}/>
    </>
}

export const WatchContainerWithPageContainer = WithPageContainer(WatchContainer);
