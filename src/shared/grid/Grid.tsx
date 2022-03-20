import styled from 'styled-components';

const StyledGrid = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 16px;
        margin: 0;
    `;

export const Grid = (props: any) => {
    return (
        <StyledGrid {...props} className="grid">
            {props.children}
        </StyledGrid>
    )
}


const StyledGridItem = styled.div`
        font-size: 24px;
        line-height: 1.3;
        margin: 0;
        border: 1px solid #bcbcbd;
        padding: 24px;
        border-radius: 3px;
        position: relative;

        &:hover {
            cursor: pointer;
            border-color: black;
        }
    `;
export const GridItem = (props: any) => {

    return (
        <StyledGridItem {...props} className="grid-item">
            {props.children}
        </StyledGridItem>
    )
}