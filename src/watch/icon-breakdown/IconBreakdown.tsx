import { useSelector } from 'react-redux';
import { Card, CardContainer } from '../../shared/card/card';
import { WatchReducerBreakdown } from '../../store/watch/reducer';
import { selectDerivedBreakdownsById } from '../../store/watch/selectors';

const BreakdownItem = ({ breakdown }: { breakdown: WatchReducerBreakdown }) => {
    return (
        <Card title={breakdown.title} description={breakdown.description}></Card>
    )
}

const BreakdownList = ({ breakdowns }: { breakdowns: Array<WatchReducerBreakdown> }) => {
    const list = breakdowns.map((b) => {
        return <BreakdownItem key={b._id} breakdown={ b } />;
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
            <div className="watch-section-title">
                Breakdown of why it is iconic
            </div>

            <BreakdownList breakdowns={breakdowns} />
        </div>
    )
}
