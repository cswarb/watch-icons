import { useSelector } from 'react-redux';
import { WatchReducerBreakdown } from '../../store/watch/reducer';
import { selectDerivedBreakdownsById } from '../../store/watch/selectors';
import { StyledSectionTitle } from '../Watch';

const BreakdownItem = ({ breakdown }: { breakdown: WatchReducerBreakdown }) => {
    return (
        <div>
            <header>
                <h3>{breakdown.title}</h3>
            </header>
            <footer>
                <p>{breakdown.description}</p>
            </footer>
        </div>
    )
}

const BreakdownList = ({ breakdowns }: { breakdowns: Array<WatchReducerBreakdown> }) => {
    const list = breakdowns.map((b) => {
        return <BreakdownItem key={b._id} breakdown={ b } />;
    });

    return (
        <section>
            {list}
        </section>
    )
}

export const IconBreakdown = ({ breakdownIds }: { breakdownIds: Array<string> }) => {
    const breakdowns: Array<WatchReducerBreakdown> = useSelector(state => selectDerivedBreakdownsById(state, breakdownIds));

    return (
        <div style={{margin: '0 0 10rem 0'}}>
            <StyledSectionTitle>
                Breakdown of why it is iconic
            </StyledSectionTitle>

            <BreakdownList breakdowns={breakdowns} />
        </div>
    )
}
