import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { selectWatchById } from '../store/watch/selectors';

export const WatchItem = ({ item }: any) => {
    const watch = useSelector(state => selectWatchById(state, item));

    return (
        <li>
            <Link
                className="nav__anchor"
                to={`/watch/${watch?._id}`}
                state={{ background: 'black', color: 'white' }}>
                {watch?.make} {watch?.model} '{watch?.shortname}'
            </Link>
        </li>
    );
}

export const Home = ({ watchIds }: { watchIds: Array<string>}) => {
    const list = watchIds.map((item) => { 
        return (
            <WatchItem key={item} item={item} />
        )
    });

    return (
        <ul>
            {list}
        </ul>
    )
}

export const HomeWithPageContainer = WithPageContainer(Home);
