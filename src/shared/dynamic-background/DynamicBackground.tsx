import { useRef } from 'react';
import { useLocation as Location } from 'react-router-dom';
import {
    TransitionGroup,
    CSSTransition,
    SwitchTransition
} from "react-transition-group";
import styled from "styled-components";

const StyledDynamicBackground = styled.div`
    padding: 32px;
`

export const WithDynamicBackground = (props: any) => {
    const { state }: any = Location();
    const nodeRef = useRef(null);
    console.log('state: ', state);

    return (
        <SwitchTransition>
            <CSSTransition key={ state?.background }
                nodeRef={nodeRef}
                classNames="app-transition--fade"
                timeout={ 500 }>
                <StyledDynamicBackground ref={nodeRef} className="app-transition--fade" style={{
                    background: '#ffffff' || `${state?.background}`,
                    color: `#000000`
                }}>
                    { props.children }
                </StyledDynamicBackground>
            </CSSTransition >
        </SwitchTransition >
    )
}