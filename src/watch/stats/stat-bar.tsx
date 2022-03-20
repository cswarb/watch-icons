export const StatBar = (props: any) => {
    return (
        <>
            <div className="stat-bar">
                <div className="stat__item">
                    <h5 className="stat__title">No. of Components</h5>
                    <p className="stat__number">256</p>
                </div>
                <div className="stat__item">
                    <h5 className="stat__title">Power reserve</h5>
                    <p className="stat__number">40</p>
                </div>
                <div className="stat__item">
                    <h5 className="stat__title">Functions</h5>
                    <p className="stat__number">Time, Date</p>
                </div>
                <div className="stat__item">
                    <h5 className="stat__title">Est. watches produced P/A</h5>
                    <p className="stat__number">~1500</p>
                </div>
            </div>
        </>
    )
}
