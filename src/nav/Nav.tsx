import { Link } from "react-router-dom"
import styled from "styled-components";

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
    return (
        <StyledNav>
            <StyledUl>
                <StyledLi>
                    <Link className="nav__anchor" to="/">Home</Link>
                </StyledLi>
                <StyledLi>
                    <Link className="nav__anchor"
                        to={"/watch/zeitwerk"}
                        state={{ background: 'black', color: 'white' }}>Zeitwerk</Link>
                </StyledLi>
                <StyledLi>
                    <Link className="nav__anchor"
                        to={"/watch/submariner"}
                        state={{ background: '#12784a', color: 'white' }}>Submariner</Link>
                </StyledLi>
                <StyledLi>
                    <Link className="nav__anchor" to="/library">Library</Link>
                </StyledLi>
            </StyledUl>
        </StyledNav>
    )
}