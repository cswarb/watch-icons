import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { Spinner } from '../shared/spinner/spinner';
import { selectWatchById } from '../store/watch/selectors';
import { Watch } from './Watch';

export const WatchContainer = (props: any) => {
    const { watchId } = useParams();
    const watch = useSelector(state => selectWatchById(state, watchId));

    return !watch ? <Spinner /> : 
    <>
        <Watch {...props} watch={watch}/>
    </>
}

export const WatchContainerWithPageContainer = WithPageContainer(WatchContainer);
