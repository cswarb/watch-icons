import { Environment, graphql, loadQuery, RelayEnvironmentProvider, usePreloadedQuery, useRelayEnvironment } from "react-relay";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { WithDynamicBackground } from "../dynamic-background/DynamicBackground";

export const StyledSection = styled.div`
    margin-top: 48px;
`;


const artistsQuery = graphql`
  query ArtistQuery($artistID: String!) {
    artist(id: $artistID) {
      name
      ...ArtistDescription_artist
    }
  }
`;

export const Watch = (props: any) => {
    const { watchId } = useParams();
    const environment = useRelayEnvironment();
    const artistsQueryReference = loadQuery(
        environment,
        artistsQuery,
        { artistId: "1" }
    );
    const data = usePreloadedQuery(artistsQuery, artistsQueryReference);

    return (
        <Fragment>
            <WithDynamicBackground>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '10rem'
                }}>
                    <BrandLogo />
                    <WatchName watchName={watchId} />

                    <h2>
                        D3 Animation
                    </h2>
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
        </Fragment>
    )
}

// export const WatchWithBackground = WithDynamicBackground(Watch);

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