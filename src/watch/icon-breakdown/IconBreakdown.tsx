import { debug } from "../../shared/debug/debug"

export const IconBreakdown = (props: any) => {
    return (
        <>
            <h2>
                Breakdown of why it is iconic
            </h2>

            <p>{debug(props.breakdown)}</p>
        </>
    )
}
