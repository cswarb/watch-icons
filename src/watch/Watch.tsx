import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { WithDynamicBackground } from '../shared/dynamic-background/DynamicBackground';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { Spinner } from '../shared/spinner/spinner';
import { RenderWatchAnimation } from './animations/animations';
import { IconBreakdown } from './icon-breakdown/IconBreakdown';
import { BrandLogo } from './logo/BrandLogo';
import { NoteableModels } from './noteable-models/NoteableModels';
import { PriceOverTime } from './price-over-time/PriceOverTime';
import { useWatch } from './watch.hook';

export const StyledSection = styled.div`
    margin-top: 48px;
`;

export const Watch = (props: any) => {
    const { watchId } = useParams();
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

                <RenderWatchAnimation watchId={watchData.shortname} />
            </div>
        </WithDynamicBackground>

        <StyledSection>
            <IconBreakdown breakdown={watchData.breakdown} />

            <NoteableModels models={watchData.noteableModels} />

            <PriceOverTime price={watchData.price} />
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


export const WatchWithPageContainer = WithPageContainer(Watch);
