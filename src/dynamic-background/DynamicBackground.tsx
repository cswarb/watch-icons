import { useLocation as Location } from "react-router-dom";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import styled from "styled-components";

const StyledDynamicBackground = styled.div`
    padding: 32px;
`

export const WithDynamicBackground = (props: any) => {
    const { state }: any = Location();

    return (
        <TransitionGroup>
            <CSSTransition key={ state?.background }
                classNames="app-transition--fade"
                timeout={ 1000 }>
                <StyledDynamicBackground className="app-transition--fade" style={{
                    background: `linear-gradient(${state?.background} 70%, #ffffff)`,
                    color: `${state?.color}`
                }}>
                    { props.children }
                </StyledDynamicBackground>
            </CSSTransition >
        </TransitionGroup >
    )
}