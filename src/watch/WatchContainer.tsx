import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { WithDynamicBackground } from '../shared/dynamic-background/DynamicBackground';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { Spinner } from '../shared/spinner/spinner';
import { selectWatchById } from '../store/watch/selectors';
import { Watch } from './Watch';

export const WatchContainer = (props: any) => {
    const { watchId } = useParams();
    const watch = useSelector(state => selectWatchById(state, watchId));

    return <WithDynamicBackground>
        {
            !watch ? <Spinner /> :
                <>
                    <Watch {...props} watch={watch} />
                </>
        }
    </WithDynamicBackground>
}

export const WatchContainerWithPageContainer = WithPageContainer(WatchContainer);
