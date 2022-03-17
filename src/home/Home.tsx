import { Link } from 'react-router-dom';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { useWatchListing } from './watch-list.hook';

export const Home = (props: any) => {
    const watchState = useWatchListing();

    const list = watchState.map((item) => { 
        return (
            <li>
                <Link key={item._id} 
                    className="nav__anchor"
                    to={`/watch/${item._id}`}
                    state={{ background: 'black', color: 'white' }}>
                        { item.make } {item.model} '{item.shortname}'
                </Link>
            </li>
        )
    });

    return (
        <ul>
            {list}
        </ul>
    )
}

export const HomeWithPageContainer = WithPageContainer(Home);
