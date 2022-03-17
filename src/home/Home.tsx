import { Link } from 'react-router-dom';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { WatchData } from '../watch/watch.hook';

export const Home = ({ data }: { data: Array<WatchData>}) => {
    const list = data.map((item) => { 
        return (
            <li key={item._id}>
                <Link 
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
