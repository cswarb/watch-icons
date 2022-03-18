import styled from 'styled-components';
import { WithDynamicBackground } from '../shared/dynamic-background/DynamicBackground';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { WatchReducerWatch } from '../store/watch/reducer';
import { WatchAnimationFactory } from './animations/animations';
import { IconBreakdown } from './icon-breakdown/IconBreakdown';
import { WatchBrandFactory } from './logo/brands';
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
                        <WatchBrandFactory make={watch.make} />
                        <WatchName watchName={watch.model} />

                        <WatchAnimationFactory model={watch.model} />
                    </div>
                </WithDynamicBackground>

                <StyledSection>
                    <IconBreakdown breakdownIds={watch.breakdownIds} />

                    <NoteableModels modelIds={watch.noteableModelIds} />

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
