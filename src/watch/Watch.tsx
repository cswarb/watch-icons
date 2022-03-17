// import { Environment, graphql, loadQuery, RelayEnvironmentProvider, usePreloadedQuery, useRelayEnvironment } from "react-relay";
import { Fragment, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { WithDynamicBackground } from '../dynamic-background/DynamicBackground';
import { Spinner } from '../spinner/spinner';
import { useWatch } from './watch.hook';

export const StyledSection = styled.div`
    margin-top: 48px;
`;

export const Watch = (props: any) => {
    const { watchId } = useParams();
    const [ state, setState ] = useState(0);
    const watchData = useWatch(watchId?.toString());

    return !watchData ?
    <Spinner /> : 
    <>
        <WithDynamicBackground>
            <div style={{
                textAlign: 'center',
                marginBottom: '10rem'
            }}>
                <BrandLogo />
                <WatchName watchName={watchData.model} />

                <h2>
                    {state} - D3 Animation
                </h2>

                <button onClick={() => setState(state + 1)}>Test state update</button>
            </div>
        </WithDynamicBackground>

        <StyledSection>
            <h2>
                Breakdown of why it is iconic
            </h2>

            <h2>
                Noteable models in the series
            </h2>

            <h2>
                Price over time
            </h2>
        </StyledSection>
    </>
}

const StyledWatchName = styled.h1`
    font-size: 2rem;
    margin: 0;
`;
export const WatchName = (props: any) => {
    const watchName = props.watchName;

    return (
        <StyledWatchName>{`${watchName?.charAt(0).toUpperCase()}${watchName?.slice(1)}`}</StyledWatchName>
    )
}

export const BrandLogo = (props: any) => {
    return (
        <img style={{
            maxWidth: '150px',
            marginBottom: '8px'
        }} src="/img/als.svg" />
    )
}