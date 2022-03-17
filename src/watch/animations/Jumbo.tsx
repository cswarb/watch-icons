import d3 from 'd3';
import { useRef } from 'react';

export const JumboAnimation = (props: any) => {
    console.log(props);
    const ref = useRef(null);
    // d3.select(ref.current)

    return (
        <svg ref={ref}></svg>
    )
}