import styled from 'styled-components';
import { WithDynamicBackground } from '../shared/dynamic-background/DynamicBackground';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { WatchReducerWatch } from '../store/watch/reducer';
import { WatchAnimationFactory } from './animations/animations';
import { IconBreakdown } from './icon-breakdown/IconBreakdown';
import { WatchBrandFactory } from './logo/brands';
import { NoteableModels } from './noteable-models/NoteableModels';
import { PriceOverTime } from './price-over-time/PriceOverTime';
import Tooltip from '@mui/material/Tooltip';
import { useRef } from 'react';
import React from 'react';
import Fade from '@mui/material/Fade';
import * as d3 from 'd3';
import { Map } from 'immutable';

export const StyledSection = styled.div`
    margin-top: 48px;
`;

export const StyledSectionTitle = styled.h3`
    font-size: 5rem;
    margin: 0;
`;

export const Timeline = (props: any) => {
    return (
        <>
            <h3>Timeline</h3>
            <p>Timeline of models released</p>
        </>
    )
}

export enum CircleSize {
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
}

const StatCircle = ({ figure, description, color, size, ...props }: any) => {
    const format = d3.format('$,.2s');

    const mapSizeDimension = Map<CircleSize, string>()
        .set(CircleSize.LARGE, '400px')
        .set(CircleSize.MEDIUM, '300px')
        .set(CircleSize.SMALL, '250px')

    function sizeToDimension(size: CircleSize): string {
        return mapSizeDimension.get(size) || '200px';
    }

    const circleStyle = {
        backgroundColor: color,
        width: sizeToDimension(size),
        height: sizeToDimension(size)
    };

    return (
        <div {...props} className="circle" style={circleStyle}>
            <p className="circle-figure">~{format(figure)}</p>
            <p className="circle-description">{description}</p>
        </div>
    )
};

const Chip = React.forwardRef(function Chip(props: any, ref: any) {
    return (
        <div {...props} ref={ref} className="tooltip-container">
            <p className="tooltip-content">{props.children}</p>
            <span className="tooltip-icon tooltip-icon--question"></span>
        </div>
    )
});

export const KeyStats = () => {
    return (
        <div>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <StatCircle size={CircleSize.LARGE} color={'#EAF4E1'} figure={40000} description={'Production numbers P/A'} />
                    <StatCircle size={CircleSize.SMALL} color={'#fff2c1'} figure={24196} description={'Social activity - Instagram posts tagged #15202'} />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <StatCircle size={CircleSize.MEDIUM} color={'#83BED5'} figure={1400000000} description={'Brand revenue'} />
                    <StatCircle style={{ top: '-170px' }} size={CircleSize.SMALL} color={'#FE9E6D'} figure={1400000000} description={'Brand revenue'} />
                </div>
            </div>

            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                placement="bottom"
                arrow
                title={
                    <>
                        <h2 style={{ margin: 0 }}>Hello</h2>
                        <p style={{ margin: 0 }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    </>
                }
            >
                <Chip>Where do these numbers come from?</Chip>
            </Tooltip>
        </div>
    )
}

export const Watch = ({ watch }: { watch: WatchReducerWatch}) => {
    return (
        watch && (
            <>
                <div style={{
                    textAlign: 'center',
                }}>
                    <WatchBrandFactory make={watch.make} />
                    <WatchName watchName={watch.model} />

                    <WatchAnimationFactory model={watch.model} />
                </div>

                <KeyStats />

                <StyledSection>
                    <IconBreakdown breakdownIds={watch.breakdownIds} />

                    <NoteableModels modelIds={watch.noteableModelIds} />

                    <PriceOverTime priceId={watch.priceId} />
                </StyledSection>

                <Timeline />
            </>
        )
    )
};

const StyledWatchName = styled.h1`
    font-size: 16rem;
    margin: 0;
    line-height: 1.3;
    color: black;
`;

export const WatchName = (props: any) => {
    const watchName = props.watchName;

    return (
        <StyledWatchName>{`${watchName?.charAt(0).toUpperCase()}${watchName?.slice(1)}`}</StyledWatchName>
    )
}


export const WatchWithPageContainer = WithPageContainer(Watch);
