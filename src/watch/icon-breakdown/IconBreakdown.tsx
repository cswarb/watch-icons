import { useSelector } from 'react-redux';
import { debug } from '../../shared/debug/debug'
import { selectDerivedBreakdownsById } from '../../store/watch/selectors';

export const IconBreakdown = ({ breakdownIds }: any) => {
    const breakdown = useSelector(state => selectDerivedBreakdownsById(state, breakdownIds));

    return (
        <>
            <h2>
                Breakdown of why it is iconic
            </h2>

            <p>{debug(breakdown)}</p>
        </>
    )
}
