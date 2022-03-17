import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useWatchListing } from '../home/watch-list.hook';
import { ThemeContext, Themes } from '../theme/theme.context';

const StyledNav = styled.nav`

    `;

const StyledUl = styled.ul`
        display: flex;
        margin: 16px 0 32px 0;
        padding: 0;
    `;

const StyledLi = styled.li`
        margin: 0 32px;
        list-style: none;

        &:first-of-type {
            margin-left: 0;
        }

        &:last-of-type {
            margin-right: 0;
        }
    `;

export const Nav = () => {
    const theme = useContext(ThemeContext);
    const watches = useWatchListing();
    
    const watchList = watches.map((watch) => {
        return (
            <StyledLi key={watch._id}>
                <Link className="nav__anchor"
                    to={`/watch/${watch._id}`}
                    state={{ background: 'black', color: 'white' }}>{watch.model}</Link>
            </StyledLi>
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