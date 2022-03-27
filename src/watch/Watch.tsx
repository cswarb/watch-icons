import styled from 'styled-components';
import { WithDynamicBackground } from '../shared/dynamic-background/DynamicBackground';
import { WithPageContainer } from '../shared/page-container/PageContainer';
import { WatchReducerWatch } from '../store/watch/reducer';
import { WatchAnimationFactory } from './animations/animations';
import { IconBreakdown } from './icon-breakdown/IconBreakdown';
import { WatchBrandFactory } from './logo/brands';
import { NoteableModels } from './noteable-models/NoteableModels';
import { PriceOverTime } from './price-over-time/PriceOverTime';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import { CircleSize, StatCircle } from './stats/circle';
import { Timeline } from './timeline/timeline';
import { StatBar } from './stats/stat-bar';
import { Chip } from '../shared/chip/chip';
import { useSelector } from 'react-redux';
import { selectBrandStatsById, selectWatchStatsById } from '../store/watch/selectors';
import { debug } from '../shared/debug/debug';


const DarkTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#2C2C2C',
        color: '#F3F3F3',
        padding: '1rem'
    },
}));

export const KeyStats = ({ brandStatsId }: any) => {
    const brandStats = useSelector(state => selectBrandStatsById(state, brandStatsId));
    console.log('brandStats: ', brandStats);
    

    return (
        <div>
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <StatCircle size={CircleSize.LARGE} color={'#6171FE'} figure={'40k'} description={'Production numbers P/A'} />
                    <StatCircle size={CircleSize.SMALL} color={'#fff2c1'} figure={'24k'} description={'Social activity - Instagram posts tagged #15202'} />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <StatCircle size={CircleSize.MEDIUM} color={'#83BED5'} figure={'1.4B'} description={'Brand revenue'} />
                    <StatCircle style={{ top: '-170px' }} size={CircleSize.SMALL} color={'#FFBD70'} figure={'1.4B'} description={'Brand revenue'} />
                </div>
            </div>

            <DarkTooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                placement="bottom"
                arrow
                title={
                    <>
                        <p style={{ margin: 0 }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                    </>
                }
            >
                <Chip>Where do these numbers come from?</Chip>
            </DarkTooltip>
        </div>
    )
}

export const ProductionTime = ({ watchStatsId }: any) => {
    const watchStats = useSelector(state => selectWatchStatsById(state, watchStatsId));

    return (
        <>
            <h2>Production years</h2>
            <p>from: {watchStats.productionYears.from}</p>
            <p>from: {watchStats.productionYears.to}</p>
        </>
    )
}

export const Watch = ({ watch }: { watch: WatchReducerWatch}) => {
    return (
        watch && (
            <>
                <div style={{
                    textAlign: 'center',
                    margin: '10rem 0 1rem 0'
                }}>
                    {/* <WatchBrandFactory make={watch.make} /> */}
                    <WatchName watchMake={watch.make} watchName={watch.model} />

                    <WatchAnimationFactory model={watch.model} />
                </div>

                <div className="in-page-container">
                    {/* <KeyStats brandStatsId={watch.brandStatsId} /> */}

                    <StatBar watchStatsId={watch.watchStatsId} />

                    <ProductionTime watchStatsId={watch.watchStatsId} />

                    <div className="watch-section">
                        <IconBreakdown breakdownIds={watch.breakdownIds} />

                        <NoteableModels modelIds={watch.noteableModelIds} />

                        <PriceOverTime priceId={watch.priceId} />
                    </div>

                    {/* <Timeline /> */}
                </div>
            </>
        )
    )
};

export const WatchName = (props: any) => {
    const watchName = props.watchName;
    const watchBrand = props.watchMake;

    return (
        <>
            {/* <p> */}
                <p className="watch-brand">{`${watchBrand?.charAt(0).toUpperCase()}${watchBrand?.slice(1)}`}</p>
                <p className="watch-name">{`${watchName?.charAt(0).toUpperCase()}${watchName?.slice(1)}`}</p>
            {/* </p> */}
        </>
    )
}


export const WatchWithPageContainer = WithPageContainer(Watch);
