import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getBackgroundColour } from '../nav/Nav';
import { Card, CardContainer } from '../shared/card/card';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { selectWatchById } from '../store/watch/selectors';

export const WatchItem = ({ item, i }: any) => {
    const watch = useSelector(state => selectWatchById(state, item));
    const align = i % 2 === 0 ? 'left' : 'right';
    const number = i + 1;

    return (
                <div className="home__link-container">
                    <span className="home__iterator">{number < 10 ? `0${number}` : number}.</span>
                    <Link className={classNames('home__watch',
                            {
                                ['home__watch--inactive']: i > 1
                            }
                        )}
                        to={`/watch/${watch?._id}`}
                        state={{ background: '#ffffff' || getBackgroundColour(watch.make), color: 'white' }}>
                        <span>{watch?.make} </span>
                        <span>{watch?.model}</span>
                    </Link>
                </div>
    );
}

export const Home = ({ watchIds }: { watchIds: Array<string>}) => {
    const list = watchIds.map((item, i) => { 
        return (
            <WatchItem key={item} item={item} i={i} />
        )
    });
    
    return (
        <div className="home__links">
            {list}
        </div>
    )
}

export const HomeWithPageContainer = WithPageContainer(Home);
