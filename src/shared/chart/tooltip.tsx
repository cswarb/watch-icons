export const Tooltip = ({ data }: any) => {
    if (!data) {
        return (
            <div className="tooltip">
                Unable to show data
            </div>
        )
    }

    return (
        <div className="tooltip-cont">
            <div className="tooltip">
                <header className="tooltip__header">
                    <p className="tooltip__title">{ data?.title }</p>
                    <p className="tooltip__heading"> { data?.date }</p>
                </header>

                <div className="tooltip__headline">
                    <p className="tooltip__headline-key">{ data?.headline?.key }</p>
                    <p className="tooltip__headline-value">{data?.headline?.value }</p>
                </div>
            </div>
        </div>
    )
}