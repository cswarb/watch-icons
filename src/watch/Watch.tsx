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
import { Outro } from './outro';
import { WatchNavigation } from './watch-navigation';

import { Faded } from 'baby-i-am-faded'
import 'baby-i-am-faded/styles.css'
import { Card } from '../shared/card/card';


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
    const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatDate = (date: string) => {
        const d = new Date(date);
        return date && `${d.getDate()} ${months[d.getMonth() - 1]}. ${d.getFullYear()}`;
    };

    const currentProductionModel = watchStats.productionYears.to >= new Date();

    return (
        <Card title={
            <>
                { currentProductionModel ? 
                    'A current production model since' + formatDate(watchStats.productionYears.from)
                    : formatDate(watchStats.productionYears.from) + ' — ' + formatDate(watchStats.productionYears.to)
                }
            </>
        }>
        </Card>
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

                    {/* <Faded whenInView> */}
                        <img width="200px" src="https://hackaday.com/wp-content/uploads/2015/11/total-gear-plan-composite-cropped.jpg" />

                        <WatchName watchMake={watch.make} watchName={watch.model} />

                        <WatchAnimationFactory model={watch.model} />
                    {/* </Faded> */}
                </div>

                <div className="in-page-container">
                    {/* <KeyStats brandStatsId={watch.brandStatsId} /> */}

                    {/* <Faded whenInView> */}
                        <StatBar watchStatsId={watch.watchStatsId} />
                    {/* </Faded> */}

                    {/* <Faded whenInView> */}
                        <ProductionTime watchStatsId={watch.watchStatsId} />
                    {/* </Faded> */}

                    <div className="watch-section">
                        {/* <Faded whenInView> */}
                            <IconBreakdown breakdownIds={watch.breakdownIds} />
                        {/* </Faded> */}

                        <div className="gallery">
                            <div className="gallery-item gallery-item-1"></div>
                            <div className="gallery-item gallery-item-2"></div>
                            <div className="gallery-item gallery-item-3"></div>
                            <div className="gallery-item gallery-item-4"></div>
                        </div>

                        {/* <Faded whenInView> */}
                            <NoteableModels modelIds={watch.noteableModelIds} />
                        {/* </Faded> */}

                        <PriceOverTime priceId={watch.priceId} />
                    </div>

                    <hr className="rule" />


                    {/* <Faded whenInView> */}
                        <Outro title={'Forever an icon'} description={'In short, an icon. The Royal Oak has the mechanical pedigree and unique indutrial design aesthetic to be revered as one of the most iconic sports watches of all time. It\'s popularity shows no sign of slowing down, even with an enormous modern catalogue of over 140 references. Examples like the current iteration 16202 Jumbo providing much needed modern features like a quick set date and improved power reserve serve as the modern take on this classic.'} />
                    {/* </Faded> */}

                    {/* <Timeline /> */}
                </div>

                {/* <Faded whenInView> */}
                    <WatchNavigation />
                {/* </Faded> */}
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
