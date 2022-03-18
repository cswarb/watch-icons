import styled from 'styled-components';
import { debug } from '../shared/debug/debug';
import { WithDynamicBackground } from '../shared/dynamic-background/DynamicBackground';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { WatchReducerWatch } from '../store/watch/reducer';
import { RenderWatchAnimation } from './animations/animations';
import { IconBreakdown } from './icon-breakdown/IconBreakdown';
import { BrandLogo } from './logo/BrandLogo';
import { NoteableModels } from './noteable-models/NoteableModels';
import { PriceOverTime } from './price-over-time/PriceOverTime';

export const StyledSection = styled.div`
    margin-top: 48px;
`;

export const Watch = ({ watch }: { watch: WatchReducerWatch}) => {
    return (
        watch && (
            <>
                <WithDynamicBackground>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '10rem'
                    }}>
                        <BrandLogo />
                        <WatchName watchName={watch.model} />

                        <RenderWatchAnimation watchId={watch.shortname} />
                    </div>
                </WithDynamicBackground>

                <StyledSection>
                    <IconBreakdown breakdownIds={watch.breakdownIds} />

                    <NoteableModels models={watch.noteableModels} />

                    <PriceOverTime priceId={watch.priceId} />
                </StyledSection>
            </>
        )
    )
};

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
