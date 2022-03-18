import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext, Themes } from '../contexts/theme.context';
import { useSelector } from 'react-redux';
import { selectAllWatchesIds, selectWatchById } from '../store/watch/selectors';

const StyledNav = styled.nav`

    `;

const StyledUl = styled.ul`
        display: flex;
        margin: 2rem;
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
    `;

export const WatchLink = ({ id }: any) => {
    const watch = useSelector(state => selectWatchById(state, id));
    
    return (
        <StyledLi key={watch._id}>
            <Link className="nav__anchor"
                to={`/watch/${watch._id}`}
                state={{ background: 'black', color: 'white' }}>{watch.model}</Link>
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
                        <Link className="nav__anchor" to="/">Home</Link>
                    </StyledLi>

                    {watchList}
                
                    <StyledLi>
                        <Link className="nav__anchor" to="/library">Library</Link>
                    </StyledLi>
                </StyledUl>
            </StyledNav>
        </ThemeContext.Provider>
    )
}
