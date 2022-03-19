import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext, Themes } from '../contexts/theme.context';
import { useSelector } from 'react-redux';
import { selectAllWatchesIds, selectWatchById } from '../store/watch/selectors';
import { WatchReducerWatch } from '../store/watch/reducer';

const StyledNav = styled.nav`
    margin: 2rem;
    font-weight: 600;
`;

const StyledUl = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
`;

const StyledLi = styled.li`
    margin: 0 2rem;
    list-style: none;

    &:first-of-type {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }

    a {
        color: black;
        text-decoration: none;
    }
`;

export const getBackgroundColour = (watchMake: string): string => {
    switch (watchMake) {
        case 'Audemars Piguet':
            return '#02291f';
        case 'A Lange & Sohne':
            return '#000000';
        default:
            return '#000000';
    }
}

export const WatchLink = ({ id }: any) => {
    const watch: WatchReducerWatch = useSelector(state => selectWatchById(state, id));
    
    return (
        <StyledLi key={watch._id}>
            <Link className="nav__anchor"
                to={`/watch/${watch._id}`}
                state={{ background: getBackgroundColour(watch.make), color: '#FFFFFF' }}>{watch.model}</Link>
        </StyledLi>
    )
};

export const Nav = () => {
    const theme = useContext(ThemeContext);
    const watchIds = useSelector(selectAllWatchesIds);
    
    const watchList = watchIds.map((id) => {
        return (
            <WatchLink key={id} id={id} />
        )
    });

    return (
        <ThemeContext.Provider value={ Themes().default }>
            <StyledNav>
                <StyledUl>
                    <StyledLi>
                        <Link className="nav__anchor" to="/" state={{ background: '#FFFFFF', color: '#000000' }}>Home</Link>
                    </StyledLi>

                    {watchList}
                
                    <StyledLi>
                        <Link className="nav__anchor" to="/library" state={{ background: '#FFFFFF', color: '#000000' }}>Technical library</Link>
                    </StyledLi>
                </StyledUl>
            </StyledNav>
        </ThemeContext.Provider>
    )
}
