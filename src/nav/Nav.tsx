import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext, Themes } from '../contexts/theme.context';
import { useSelector } from 'react-redux';
import { selectAllWatchesIds, selectWatchById } from '../store/watch/selectors';
import { WatchReducerWatch } from '../store/watch/reducer';
import { Logo } from '../logo/logo';

const StyledNav = styled.nav`
    margin: 2rem 6rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledUl = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
`;

const StyledLi = styled.li`
    margin: 0 0.4rem;
    list-style: none;
    text-align: center;
    font-size: 0.95rem;
    font-weight: 400;
    color: black;

    &:first-of-type {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }

    a, button {
        font-size: 0.95rem;
        font-weight: 400;
        color: black;
        text-decoration: none;
        padding: 0;
    }

     a:hover, button:hover {
         cursor: pointer;
         text-decoration: underline;
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
            <svg>
                <text>Watch image here as background</text>
            </svg>
            <Link className="nav__anchor"
                to={`/watch/${watch._id}`}
                state={{ background: getBackgroundColour(watch.make), color: '#000000' }}>{watch.model}</Link>
        </StyledLi>
    )
};

export const Nav = () => {
    const theme = useContext(ThemeContext);
    const watchIds = useSelector(selectAllWatchesIds);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const watchList = watchIds.map((id) => {
        return (
            <WatchLink key={id} id={id} />
        )
    });

    return (
        <ThemeContext.Provider value={ Themes().default }>
            <StyledNav>
                <Link className="nav__anchor" to="/" title="Home" state={{ background: '#FFFFFF', color: '#000000' }}>
                    <Logo />
                </Link>

                <StyledUl>
                    {/* <StyledLi>
                        <button onClick={() => setDropdownOpen(!dropdownOpen)}>Watches</button>
                    </StyledLi> */}

                    {
                        // dropdownOpen && 
                        // <div className="dropdown">
                        //     {/* <button onClick={() => setDropdownOpen(false)}>x</button> */}

                        //     <div className="dropdown__items">
                        //         {watchList}
                        //     </div>
                        // </div>
                    }
                
                    {/* <StyledLi>
                        <Link className="nav__anchor" to="/library" state={{ background: '#FFFFFF', color: '#000000' }}>Technical library</Link>
                    </StyledLi> */}

                    <StyledLi>
                        <Link className="nav__anchor" to="/" state={{ background: '#FFFFFF', color: '#000000' }}>Watches</Link>
                    </StyledLi>

                    <StyledLi>
                        <Link className="nav__anchor" to="/about" state={{ background: '#FFFFFF', color: '#000000' }}>About</Link>
                    </StyledLi>
                </StyledUl>
            </StyledNav>
        </ThemeContext.Provider>
    )
}
