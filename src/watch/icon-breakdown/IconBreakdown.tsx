import { useSelector } from 'react-redux';
import { Card, CardContainer } from '../../shared/card/card';
import { WatchReducerBreakdown } from '../../store/watch/reducer';
import { selectDerivedBreakdownsById } from '../../store/watch/selectors';
import { Faded } from 'baby-i-am-faded'
import 'baby-i-am-faded/styles.css'

const BreakdownItem = ({ breakdown, i }: { breakdown: WatchReducerBreakdown, i: number }) => {
    const align = i % 2 === 0 ? 'left' : 'right';

    return (
        <Card align={align} title={breakdown.title} description={breakdown.description}></Card>
    )
}

const BreakdownList = ({ breakdowns }: { breakdowns: Array<WatchReducerBreakdown> }) => {
    const list = breakdowns.map((b, i) => {
        return <BreakdownItem key={b._id} breakdown={ b } i={i} />;
    });

    return (
        <CardContainer>
                {list}
        </CardContainer>
    )
}

export const IconBreakdown = ({ breakdownIds }: { breakdownIds: Array<string> }) => {
    const breakdowns: Array<WatchReducerBreakdown> = useSelector(state => selectDerivedBreakdownsById(state, breakdownIds));

    return (
        <div style={{}}>
            <h2 className="watch-section-title">
                Breakdown of an icon
            </h2>

            <BreakdownList breakdowns={breakdowns} />
        </div>
    )
}
