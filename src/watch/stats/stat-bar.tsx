import { useSelector } from 'react-redux';
import { selectWatchStatsById } from '../../store/watch/selectors';

export const StatBar = ({ watchStatsId }: any) => {
    const watchStats = useSelector(state => selectWatchStatsById(state, watchStatsId));
    const functions = watchStats.functions.map((f: any) => f.name).join(', ');

    return (
        <>
            <div className="stat-bar">
                <div className="stat__item">
                    <h5 className="stat__title">No. of Components</h5>
                    <p className="stat__number">{watchStats.components}</p>
                </div>
                <div className="stat__item">
                    <h5 className="stat__title">Power reserve</h5>
                    <p className="stat__number">{watchStats.powerReserveHours}</p>
                </div>
                <div className="stat__item">
                    <h5 className="stat__title">Functions</h5>
                    <p className="stat__number">{functions}</p>
                </div>
                <div className="stat__item">
                    <h5 className="stat__title">Est. watches produced P/A</h5>
                    <p className="stat__number">~{watchStats.productionNumbersPerYear}</p>
                </div>
            </div>
        </>
    )
}
